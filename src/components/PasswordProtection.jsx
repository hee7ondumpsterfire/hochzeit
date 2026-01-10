import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Lock } from 'lucide-react';

export default function PasswordProtection({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const auth = localStorage.getItem('site_auth');
        if (auth === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === 'juliaundmax2020') {
            setIsAuthenticated(true);
            localStorage.setItem('site_auth', 'true');
            setError('');
        } else {
            setError('Das Passwort ist leider falsch.');
        }
    };

    if (isAuthenticated) {
        return <>{children}</>;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center min-h-screen bg-[#fdfbf7]">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#d4af37] rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#d4af37] rounded-full blur-[100px]" />
            </div>

            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 w-full max-w-md p-8 mx-4 text-center bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/50"
            >
                <div className="flex justify-center mb-6">
                    <div className="p-4 bg-[#fdfbf7] rounded-full shadow-inner">
                        <Heart className="w-8 h-8 text-[#d4af37]" fill="#d4af37" />
                    </div>
                </div>

                <h1 className="font-serif text-3xl text-[#2c2c2c] mb-2">
                    Julia & Max
                </h1>
                <p className="font-sans text-[#666] mb-8">
                    Bitte gib das Passwort ein, um zur Webseite zu gelangen.
                </p>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="relative">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Passwort"
                            className="w-full px-4 py-3 text-center bg-white border outline-none rounded-lg border-[#e0e0e0] focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all font-sans placeholder:text-gray-400"
                            autoFocus
                        />
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>

                    {error && (
                        <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-500 text-sm font-sans"
                        >
                            {error}
                        </motion.p>
                    )}

                    <button
                        type="submit"
                        className="w-full py-3 px-6 bg-[#2c2c2c] text-white font-sans tracking-wide rounded-lg hover:bg-[#404040] transition-colors duration-300 shadow-lg"
                    >
                        Eintreten
                    </button>
                </form>

                <p className="mt-8 text-xs text-gray-400 font-sans">
                    26. September 2026 • Nohra
                </p>
            </motion.div>
        </div>
    );
}
