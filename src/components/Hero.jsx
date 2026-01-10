import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, ArrowRight } from 'lucide-react';
import heroImg from '../assets/hero-new.jpg';
import './Hero.css';
import Countdown from './Countdown';

export default function Hero({ isLocked, onUnlock }) {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });
            const data = await res.json();

            if (res.ok && data.success) {
                onUnlock();
                setError('');
            } else {
                setError('Falsches Passwort');
            }
        } catch (err) {
            console.error('API Error', err);
            setError('Login derzeit nicht möglich (API Error).');
        }
    };

    return (
        <section className="hero">
            <div
                className="hero-bg"
                style={{ backgroundImage: `url(${heroImg})` }}
            >
                <div className="hero-overlay" />
            </div>

            <div className="hero-content">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="hero-subtitle"
                >
                    Wir heiraten
                </motion.h2>

                <motion.h1
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="hero-title"
                >
                    Julia & Max
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="hero-date"
                >
                    26. September 2026 • Nohra, Deutschland
                </motion.p>

                {isLocked && (
                    <motion.form
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        onSubmit={handleLogin}
                        style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}
                    >
                        <div style={{ position: 'relative', width: '200px' }}>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Passwort eingeben..."
                                style={{
                                    width: '100%',
                                    background: 'transparent',
                                    border: 'none',
                                    borderBottom: '1px solid rgba(255,255,255,0.5)',
                                    padding: '0.5rem 2rem 0.5rem 0.5rem',
                                    color: 'white',
                                    fontSize: '1rem',
                                    textAlign: 'center',
                                    outline: 'none',
                                    fontFamily: 'inherit'
                                }}
                                autoFocus
                            />
                            <button
                                type="submit"
                                style={{
                                    position: 'absolute',
                                    right: 0,
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'none',
                                    border: 'none',
                                    color: 'white',
                                    cursor: 'pointer',
                                    padding: '0.25rem'
                                }}
                            >
                                <ArrowRight size={18} />
                            </button>
                        </div>
                        {error && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                style={{ color: '#ff6b6b', fontSize: '0.875rem' }}
                            >
                                {error}
                            </motion.p>
                        )}
                    </motion.form>
                )}
            </div>

            {!isLocked && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="hero-scroll"
                    style={{ width: '100%' }}
                >
                    <Countdown />
                    <div style={{ marginTop: '1rem', animation: 'bounce 2s infinite' }}>
                        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </div>
                </motion.div>
            )}
        </section>
    );
}
