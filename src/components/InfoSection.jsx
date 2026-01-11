import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Wine, Coffee, Heart, Utensils } from 'lucide-react';
import './InfoSection.css';

export default function InfoSection() {
    const fadeInUp = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 }
    };



    return (
        <section className="info-section">
            <div className="info-container">
                <motion.h2 {...fadeInUp} className="info-title">Der Ablauf</motion.h2>

                <div className="timeline">
                    <motion.div {...fadeInUp} className="timeline-item">
                        <Wine className="w-8 h-8 text-accent mb-2" />
                        <span className="timeline-time">13:30</span>
                        <h3 className="timeline-event">Ankunft & Begrüssung</h3>
                        <p className="timeline-desc">Empfang der Gäste.</p>
                    </motion.div>

                    <div style={{ position: 'relative', marginTop: '2rem' }}>
                        <div style={{ filter: 'blur(6px)', opacity: 0.5, pointerEvents: 'none', userSelect: 'none' }}>
                            <motion.div {...fadeInUp} className="timeline-item">
                                <Heart className="w-8 h-8 text-accent mb-2" />
                                <span className="timeline-time">14:30</span>
                                <h3 className="timeline-event">Zeremonie</h3>
                                <p className="timeline-desc">Ja-Wort im Garten vorm Kuppeldom.</p>
                            </motion.div>

                            <motion.div {...fadeInUp} className="timeline-item">
                                <Coffee className="w-8 h-8 text-accent mb-2" />
                                <span className="timeline-time">15:30</span>
                                <h3 className="timeline-event">Kaffee & Hochzeitstorte</h3>
                                <p className="timeline-desc">Zeit für Süßes und gute Gespräche.</p>
                            </motion.div>

                            <motion.div {...fadeInUp} className="timeline-item">
                                <Utensils className="w-8 h-8 text-accent mb-2" />
                                <span className="timeline-time">18:30</span>
                                <h3 className="timeline-event">Das Festessen</h3>
                                <p className="timeline-desc">Dinner, Party & Tanz.</p>
                            </motion.div>
                        </div>

                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 10
                        }}>
                            <div style={{
                                background: 'rgba(255, 255, 255, 0.9)',
                                padding: '1rem 2rem',
                                borderRadius: '50px',
                                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                                border: '1px solid var(--color-accent-light)',
                                color: 'var(--color-primary)',
                                fontWeight: '500',
                                letterSpacing: '0.05em'
                            }}>
                                Weitere Details folgen in Kürze
                            </div>
                        </div>
                    </div>
                </div>




            </div>
        </section>
    );
}
