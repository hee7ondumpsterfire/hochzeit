import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, AlertCircle } from 'lucide-react';
import { guests } from '../data/guests';
import './Rsvp.css';

export default function Rsvp() {
    const [searchParams] = useSearchParams();
    const guestName = searchParams.get('guest');

    const [formData, setFormData] = useState({
        name: '',
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

    const handleSubmit = (e) => {
        e.preventDefault();

        // 1. Validate Name
        const foundGuest = guests.find(g => normalize(g.name) === normalize(formData.name));

        if (!foundGuest) {
            setError('Entschuldigung, dieser Name steht nicht auf der Gästeliste. Bitte überprüfen Sie die Schreibweise oder kontaktieren Sie uns.');
            return;
        }

        // 2. Save to "Database" (LocalStorage)
        // Calculate total count for admin info
        const kidCount = formData.bringingKids === 'yes' ? formData.kids.filter(k => k.trim() !== '').length : 0;
        const totalCount = 1 + (formData.hasPlusOne === 'yes' ? 1 : 0) + kidCount;

        const newEntry = {
            ...formData,
            guestCount: totalCount, // Computed for backward compatibility/admin view
            timestamp: new Date().toISOString()
        };

        const currentDb = JSON.parse(localStorage.getItem('rsvp_db') || '[]');
        const updatedDb = currentDb.filter(entry => normalize(entry.name) !== normalize(formData.name));
        updatedDb.push(newEntry);

        localStorage.setItem('rsvp_db', JSON.stringify(updatedDb));

        setMatchedGuest(foundGuest);
        setTimeout(() => setSubmitted(true), 1000);
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
                            <p className="text-sm text-gray-500">Wir freuen uns auf euch!</p>
                        )}
                    </div>
                </motion.div>
            </section>
        );
    }

    return (
        <section id="rsvp" className="rsvp-section">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="rsvp-card"
            >
                <h2 className="rsvp-title">U.A.w.g.</h2>

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

