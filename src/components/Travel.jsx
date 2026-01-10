import React from 'react';
import { motion } from 'framer-motion';
import { Train, Home, Map } from 'lucide-react';

import travelBg from '../assets/travel-bg.jpg';

export default function Travel() {
    const fadeInUp = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 }
    };

    return (
        <section className="info-section" style={{
            backgroundImage: `url(${travelBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative'
        }}>
            {/* Overlay for better readability of the white cards against detailed background */}
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.1)', zIndex: 0 }}></div>
            <div className="info-container" style={{ position: 'relative', zIndex: 1 }}>
                <motion.h2 {...fadeInUp} className="info-title">Anreise & Unterkunft</motion.h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>

                    <motion.div {...fadeInUp} style={{ background: '#fff', padding: '2rem', borderRadius: '12px', boxShadow: 'var(--shadow-md)' }}>
                        <Train className="w-8 h-8 text-accent mb-4" />
                        <h3 className="text-xl font-serif mb-3">Anreise</h3>
                        <p className="text-text-light mb-4">
                            Nohra liegt günstig zwischen Weimar und Erfurt.
                            <br /><br />
                            <strong>Bahn:</strong> Bis Weimar Hbf oder Erfurt Hbf. Von dort mit dem Taxi (ca. 15 Min).
                            <br />
                            <strong>Auto:</strong> A4 Abfahrt Nohra.
                        </p>
                    </motion.div>

                    <motion.div {...fadeInUp} style={{ background: '#fff', padding: '2rem', borderRadius: '12px', boxShadow: 'var(--shadow-md)' }}>
                        <Home className="w-8 h-8 text-accent mb-4" />
                        <h3 className="text-xl font-serif mb-3">Übernachtung</h3>
                        <ul style={{ listStyle: 'none', color: 'var(--color-text-light)' }}>
                            <li style={{ marginBottom: '1rem' }}>
                                <strong>
                                    <a
                                        href="https://www.land-alm.de/lodges.html"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ color: 'inherit', textDecoration: 'underline' }}
                                    >
                                        Land Alm Family Lodges
                                    </a>
                                </strong><br />
                                Direkt vor Ort.<br />
                                (2-6 Personen, Selbstverpflegung, Saunamöglichkeit)<br />
                                <span style={{ fontSize: '0.9rem', opacity: 0.8 }}>Begrenzte Verfügbarkeit.</span>
                            </li>
                            <li style={{ marginBottom: '1rem' }}>
                                <strong>Hotel K1 Nohra</strong><br />
                                Moderne Zimmer, nur wenige Minuten entfernt.
                            </li>
                            <li>
                                <strong>Hotel Elephant Weimar</strong><br />
                                Luxuriöse Option in der Stadt (ca. 15 Min Fahrt).
                            </li>
                        </ul>
                    </motion.div>

                </div>

                <div style={{ marginTop: '3rem', textAlign: 'center' }}>
                    <a
                        href="https://maps.google.com/?q=Am+Peterborn+2,+99428+Nohra,+Deutschland"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary"
                    >
                        <Map className="w-4 h-4 mr-2" />
                        Google Maps Route
                    </a>
                </div>
            </div>
        </section >
    );
}
