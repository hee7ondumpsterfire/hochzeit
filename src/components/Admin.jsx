import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Database, Lock, LogOut } from 'lucide-react';
import './Admin.css';

export default function Admin() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [rsvpData, setRsvpData] = useState([]);
    const [showForm, setShowForm] = useState(false);
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

    useEffect(() => {
        // Load simulated DB
        const saved = localStorage.getItem('rsvp_db');
        if (saved) {
            setRsvpData(JSON.parse(saved));
        }
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === 'hochzeit2026') {
            setIsAuthenticated(true);
        } else {
            alert('Falsches Passwort!');
        }
    };

    const handleLogout = () => setIsAuthenticated(false);

    if (!isAuthenticated) {
        return (
            <div className="admin-login-container">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="admin-login-box"
                >
                    <Lock className="w-12 h-12 mx-auto mb-4 text-primary" />
                    <h2 className="admin-title">Admin Login</h2>
                    <form onSubmit={handleLogin}>
                        <input
                            type="password"
                            className="form-input mb-4"
                            placeholder="Passwort eingeben"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit" className="btn-primary w-full">Einloggen</button>
                    </form>
                </motion.div>
            </div>
        );
    }





    const handleSave = () => {
        // Basic validation
        if (!formData.name) return alert('Name ist erforderlich');

        const newEntry = {
            ...formData,
            timestamp: new Date().toISOString(),
            guestCount: 1
                + (formData.hasPlusOne === 'yes' ? 1 : 0)
                + (formData.bringingKids === 'yes' ? formData.kids.filter(k => k).length : 0)
        };

        const updatedDb = [...rsvpData.filter(r => r.name !== formData.name), newEntry];
        setRsvpData(updatedDb);
        localStorage.setItem('rsvp_db', JSON.stringify(updatedDb));
        setShowForm(false);
        setFormData({
            name: '', attending: 'yes', hasPlusOne: 'no', plusOneName: '',
            bringingKids: 'no', kids: ['', '', ''], lodging: 'no', dietary: '', note: ''
        });
    };

    const handleEdit = (row) => {
        setFormData({ ...row, kids: row.kids || ['', '', ''] });
        setShowForm(true);
    };

    const handleDelete = (name) => {
        // Force synchronous confirm
        const confirmed = window.confirm(`Möchtest du den Eintrag von "${name}" wirklich unwiderruflich löschen?`);
        if (confirmed) {
            const updatedDb = rsvpData.filter(r => r.name !== name);
            setRsvpData(updatedDb);
            localStorage.setItem('rsvp_db', JSON.stringify(updatedDb));
        }
    };

    const countGuests = (row) => {
        if (row.attending !== 'yes') return 0;
        let count = 1; // Self
        if (row.hasPlusOne === 'yes') count++;
        if (row.bringingKids === 'yes') count += row.kids.filter(k => k).length;
        return count;
    };

    const yesCount = rsvpData.filter(r => r.attending === 'yes').length;
    const guestTotal = rsvpData.reduce((acc, row) => acc + countGuests(row), 0);

    return (
        <section className="admin-dashboard">
            <div className="admin-header">
                <div className="flex items-center gap-4">
                    <Database className="w-8 h-8" />
                    <h1>Gästeliste & RSVPs</h1>
                </div>
                <div className="flex gap-2">
                    <button onClick={() => setShowForm(!showForm)} className="btn-primary">
                        {showForm ? 'Abbrechen' : '+ Neuer Eintrag'}
                    </button>
                    <button onClick={handleLogout} className="btn-secondary flex items-center gap-2">
                        <LogOut size={16} /> Logout
                    </button>
                </div>
            </div>

            {showForm && (
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <h3 className="text-xl mb-4 font-bold">Eintrag bearbeiten / erstellen</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            placeholder="Name"
                            className="form-input"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                        />
                        <select
                            className="form-input"
                            value={formData.attending}
                            onChange={e => setFormData({ ...formData, attending: e.target.value })}
                        >
                            <option value="yes">Zusage</option>
                            <option value="no">Absage</option>
                        </select>

                        <div className="flex items-center gap-2">
                            <label>Begleitung?</label>
                            <input type="checkbox"
                                checked={formData.hasPlusOne === 'yes'}
                                onChange={e => setFormData({ ...formData, hasPlusOne: e.target.checked ? 'yes' : 'no' })}
                            />
                        </div>
                        {formData.hasPlusOne === 'yes' && (
                            <input
                                placeholder="Name Begleitung"
                                className="form-input"
                                value={formData.plusOneName}
                                onChange={e => setFormData({ ...formData, plusOneName: e.target.value })}
                            />
                        )}

                        <div className="md:col-span-2">
                            <label>Notiz / Ernährung</label>
                            <input
                                className="form-input"
                                placeholder="Notizen..."
                                value={formData.note}
                                onChange={e => setFormData({ ...formData, note: e.target.value })}
                            />
                        </div>
                    </div>
                    <button onClick={handleSave} className="btn-primary mt-4">Speichern</button>
                </div>
            )}

            <div className="stats-grid">
                <div className="stat-card">
                    <h3>Antworten</h3>
                    <p className="stat-value">{rsvpData.length}</p>
                </div>
                <div className="stat-card">
                    <h3>Zusagen</h3>
                    <p className="stat-value">{yesCount}</p>
                </div>
                <div className="stat-card">
                    <h3>Gäste Gesamt</h3>
                    <p className="stat-value">{guestTotal}</p>
                </div>
            </div>

            <div className="table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Begleitung</th>
                            <th>Kinder</th>
                            <th>Hotel</th>
                            <th>Ernährung</th>
                            <th>Notiz</th>
                            <th>Aktionen</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rsvpData.length === 0 ? (
                            <tr><td colSpan="8" className="text-center p-4">Keine Einträge vorhanden.</td></tr>
                        ) : (
                            [...rsvpData].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).map((row, i) => (
                                <tr key={i}>
                                    <td className="font-bold">{row.name}</td>
                                    <td>
                                        {row.attending === 'yes' ?
                                            <span className="badge badge-success">Zusage</span> :
                                            <span className="badge badge-danger">Absage</span>
                                        }
                                    </td>
                                    <td>
                                        {row.hasPlusOne === 'yes' ? (
                                            <div>
                                                <span className="font-semibold">Ja</span>
                                                <div className="text-xs text-gray-500">{row.plusOneName}</div>
                                            </div>
                                        ) : '-'}
                                    </td>
                                    <td>
                                        {row.bringingKids === 'yes' ? (
                                            <div className="text-sm">
                                                {row.kids.filter(k => k).map((k, idx) => (
                                                    <div key={idx}>{k}</div>
                                                ))}
                                            </div>
                                        ) : '-'}
                                    </td>
                                    <td>
                                        {row.lodging === 'yes' ? 'Ja' : '-'}
                                    </td>
                                    <td className="text-sm">
                                        {row.dietary || '-'}
                                    </td>
                                    <td className="text-sm italic text-gray-600">
                                        {row.note || '-'}
                                    </td>
                                    <td>
                                        <div className="flex gap-2">
                                            <button type="button" onClick={() => handleEdit(row)} className="text-blue-600 hover:underline">Edit</button>
                                            <button type="button" onClick={() => handleDelete(row.name)} className="text-red-600 hover:underline">Löschen</button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
