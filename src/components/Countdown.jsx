import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Countdown() {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    function calculateTimeLeft() {
        // 26. September 2026 13:30
        const difference = +new Date('2026-09-26T13:30:00') - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                Tage: Math.floor(difference / (1000 * 60 * 60 * 24)),
                Std: Math.floor((difference / (1000 * 60 * 60)) % 24),
                Min: Math.floor((difference / 1000 / 60) % 60),
                Sek: Math.floor((difference / 1000) % 60),
            };
        }
        return timeLeft;
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
    });

    const timerComponents = [];

    Object.keys(timeLeft).forEach((interval) => {
        timerComponents.push(
            <span key={interval} style={{ margin: '0 10px', textAlign: 'center' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: '500', display: 'block' }}>
                    {timeLeft[interval]}
                </span>
                <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    {interval}
                </span>
            </span>
        );
    });

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            style={{
                display: 'flex',
                justifyContent: 'center',
                color: '#fff',
                marginTop: '20px',
                padding: '20px',
                background: 'rgba(0,0,0,0.2)',
                borderRadius: '8px',
                backdropFilter: 'blur(4px)'
            }}
            aria-label="Countdown bis zur Hochzeit"
        >
            {timerComponents.length ? timerComponents : <span>Der große Tag ist da!</span>}
        </motion.div>
    );
}
