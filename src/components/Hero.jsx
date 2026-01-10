import React from 'react';
import { motion } from 'framer-motion';
import heroImg from '../assets/hero.png';
import './Hero.css';
import Countdown from './Countdown';

export default function Hero() {
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
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
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
        </section>
    );
}
