import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, AlertCircle } from 'lucide-react';
// import { guests } from '../data/guests'; // Removed for security
import rsvpBg from '../assets/rsvp-bg.jpg';
import './Rsvp.css';

export default function Rsvp() {
    const [searchParams] = useSearchParams();
    const guestName = searchParams.get('guest');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        attending: 'yes',
        hasPlusOne: 'no',
        plusOneName: '',
        bringingKids: 'no',
        kids: ['', '', ''],
        lodging: 'no',
        dietary: '',
        note: ''
    });

    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');
    const [matchedGuest, setMatchedGuest] = useState(null);

    useEffect(() => {
        if (guestName) {
            setFormData(prev => ({ ...prev, name: guestName }));
        }
    }, [guestName]);

    const normalize = (str) => str.toLowerCase().trim();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (error) setError('');
    };

    const handleKidNameChange = (index, value) => {
        const newKids = [...formData.kids];
        newKids[index] = value;
        setFormData(prev => ({ ...prev, kids: newKids }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 1. Validate Name via API
        try {
            const checkRes = await fetch(`/api/guest-check?name=${encodeURIComponent(formData.name)}`);
            if (!checkRes.ok) throw new Error('API Error');
            const checkData = await checkRes.json();

            if (!checkData.valid) {
                setError('Entschuldigung, dieser Name steht nicht auf der Gästeliste (oder API nicht erreichbar).');
                return;
            }

            // 2. Save to "Database" via API
            const kidCount = formData.bringingKids === 'yes' ? formData.kids.filter(k => k.trim() !== '').length : 0;
            const totalCount = 1 + (formData.hasPlusOne === 'yes' ? 1 : 0) + kidCount;

            const newEntry = {
                ...formData,
                guestCount: totalCount,
                timestamp: new Date().toISOString()
            };

            const saveRes = await fetch('/api/rsvp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newEntry)
            });

            if (saveRes.ok) {
                setMatchedGuest(checkData.guest);
                setTimeout(() => setSubmitted(true), 1000);
            } else {
                setError('Fehler beim Speichern. Bitte versuche es später.');
            }

        } catch (err) {
            console.error(err);
            // Fallback for purely local dev without Vercel logic (OPTIONAL: Enable simple success for testing UI)
            setError('Fehler: Backend nicht erreichbar. Bitte nutze "vercel dev".');
        }
    };

    if (submitted) {
        return (
            <section id="rsvp" className="rsvp-section">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="rsvp-card"
                >
                    <div className="success-message">
                        <div className="success-icon">
                            <Check size={32} />
                        </div>
                        <h3 className="rsvp-title">Vielen Dank!</h3>
                        <p style={{ marginBottom: '1rem' }}>Deine Antwort wurde empfangen.</p>
                        {formData.attending === 'yes' && (
                            <>
                                <p className="text-sm text-gray-500 mb-4">Wir freuen uns auf euch!</p>
                                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
                                    <a
                                        href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Hochzeit+von+Julia+%26+Max&dates=20260926T113000Z/20260926T220000Z&details=Wir+freuen+uns+auf+euch!&location=Am+Peterborn+2,+99428+Nohra,+Deutschland&sf=true&output=xml"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-secondary"
                                        style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}
                                    >
                                        Google Kalender
                                    </a>
                                    <button
                                        onClick={() => {
                                            const event = [
                                                'BEGIN:VCALENDAR',
                                                'VERSION:2.0',
                                                'BEGIN:VEVENT',
                                                'URL:http://www.julia-und-max.com',
                                                'DTSTART:20260926T113000Z',
                                                'DTEND:20260926T230000Z',
                                                'SUMMARY:Hochzeit von Julia & Max',
                                                'DESCRIPTION:Wir freuen uns auf euch!',
                                                'LOCATION:Am Peterborn 2, 99428 Nohra, Deutschland',
                                                'END:VEVENT',
                                                'END:VCALENDAR',
                                            ].join('\n');
                                            const blob = new Blob([event], { type: 'text/calendar;charset=utf-8' });
                                            const link = document.createElement('a');
                                            link.href = window.URL.createObjectURL(blob);
                                            link.setAttribute('download', 'Hochzeit-Julia-und-Max.ics');
                                            document.body.appendChild(link);
                                            link.click();
                                            document.body.removeChild(link);
                                        }}
                                        className="btn-secondary"
                                        style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}
                                    >
                                        Outlook / Apple (.ics)
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </motion.div>
            </section>
        );
    }

    return (
        <section id="rsvp" className="rsvp-section" style={{
            backgroundImage: `url(${rsvpBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
            padding: '4rem 1rem'
        }}>
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.7)', zIndex: 0 }}></div>
            <motion.div
                style={{ position: 'relative', zIndex: 1 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="rsvp-card"
            >
                <h2 className="rsvp-title">Anmeldung - Wir freuen uns auf Euch</h2>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="bg-red-50 text-red-800 p-4 rounded-md mb-6 flex items-start gap-3"
                    >
                        <AlertCircle size={20} className="shrink-0 mt-0.5" />
                        <p className="text-sm">{error}</p>
                    </motion.div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Vollständiger Name</label>
                        <input
                            type="text"
                            name="name"
                            required
                            className={`form-input ${error ? 'border-red-500' : ''}`}
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Vorname Nachname"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">E-Mail Adresse</label>
                        <input
                            type="email"
                            name="email"
                            required
                            className="form-input"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="deine@email.de"
                        />
                        <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.25rem' }}>
                            Für Neuigkeiten und selbstverständlich auch Werbezwecke.
                        </p>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Wirst du dabei sein?</label>
                        <div className="radio-group">
                            <label className="radio-label">
                                <input
                                    type="radio"
                                    name="attending"
                                    value="yes"
                                    checked={formData.attending === 'yes'}
                                    onChange={handleChange}
                                />
                                Ja
                            </label>
                            <label className="radio-label">
                                <input
                                    type="radio"
                                    name="attending"
                                    value="no"
                                    checked={formData.attending === 'no'}
                                    onChange={handleChange}
                                />
                                Nein
                            </label>
                        </div>
                    </div>

                    {formData.attending === 'yes' && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                        >
                            {/* Begleitung */}
                            <div className="form-group">
                                <label className="form-label">Bringst du eine Begleitung mit?</label>
                                <div className="radio-group">
                                    <label className="radio-label">
                                        <input
                                            type="radio"
                                            name="hasPlusOne"
                                            value="yes"
                                            checked={formData.hasPlusOne === 'yes'}
                                            onChange={handleChange}
                                        />
                                        Ja
                                    </label>
                                    <label className="radio-label">
                                        <input
                                            type="radio"
                                            name="hasPlusOne"
                                            value="no"
                                            checked={formData.hasPlusOne === 'no'}
                                            onChange={handleChange}
                                        />
                                        Nein
                                    </label>
                                </div>
                            </div>

                            {formData.hasPlusOne === 'yes' && (
                                <div className="form-group ml-4 border-l-2 border-gray-100 pl-4">
                                    <label className="form-label">Name der Begleitung</label>
                                    <input
                                        type="text"
                                        name="plusOneName"
                                        required
                                        className="form-input"
                                        value={formData.plusOneName}
                                        onChange={handleChange}
                                        placeholder="Vorname Nachname"
                                    />
                                </div>
                            )}

                            {/* Kinder */}
                            <div className="form-group">
                                <label className="form-label">Bringst du deine Kinder mit?</label>
                                <div className="radio-group">
                                    <label className="radio-label">
                                        <input
                                            type="radio"
                                            name="bringingKids"
                                            value="yes"
                                            checked={formData.bringingKids === 'yes'}
                                            onChange={handleChange}
                                        />
                                        Ja
                                    </label>
                                    <label className="radio-label">
                                        <input
                                            type="radio"
                                            name="bringingKids"
                                            value="no"
                                            checked={formData.bringingKids === 'no'}
                                            onChange={handleChange}
                                        />
                                        Nein
                                    </label>
                                </div>
                            </div>

                            {formData.bringingKids === 'yes' && (
                                <div className="form-group ml-4 border-l-2 border-gray-100 pl-4">
                                    <label className="form-label">Wie heißen sie?</label>
                                    {[0, 1, 2].map((i) => (
                                        <input
                                            key={i}
                                            type="text"
                                            className="form-input mb-2"
                                            value={formData.kids[i]}
                                            onChange={(e) => handleKidNameChange(i, e.target.value)}
                                            placeholder={`Name Kind ${i + 1}`}
                                        />
                                    ))}
                                </div>
                            )}

                            {/* Lodging */}
                            <div className="form-group">
                                <label className="form-label">Möchtet ihr vor Ort in der Land Alm Lodge übernachten? (Begrenzte Verfügbarkeit)</label>
                                <div className="radio-group">
                                    <label className="radio-label">
                                        <input
                                            type="radio"
                                            name="lodging"
                                            value="yes"
                                            checked={formData.lodging === 'yes'}
                                            onChange={handleChange}
                                        />
                                        Ja
                                    </label>
                                    <label className="radio-label">
                                        <input
                                            type="radio"
                                            name="lodging"
                                            value="no"
                                            checked={formData.lodging === 'no'}
                                            onChange={handleChange}
                                        />
                                        Nein
                                    </label>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Ernährungsbedürfnisse?</label>
                                <input
                                    type="text"
                                    name="dietary"
                                    className="form-input"
                                    value={formData.dietary}
                                    onChange={handleChange}
                                    placeholder="z.B. Vegetarisch, Glutenfrei..."
                                />
                            </div>
                        </motion.div>
                    )}

                    <div className="form-group">
                        <label className="form-label">Nachricht (Optional)</label>
                        <textarea
                            name="note"
                            className="form-textarea"
                            rows="3"
                            value={formData.note}
                            onChange={handleChange}
                            placeholder="Eine Nachricht an das Brautpaar..."
                        ></textarea>
                    </div>

                    <button type="submit" className="btn-submit">
                        {formData.attending === 'yes' ? 'Bestätigen' : 'Absenden'}
                    </button>
                </form>
            </motion.div>
        </section>
    );
}

