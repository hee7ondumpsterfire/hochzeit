import React from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, Wine, Coffee, Heart, Utensils } from 'lucide-react';
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
                        <h3 className="timeline-event">Ankunft & Aperitivo</h3>
                        <p className="timeline-desc">Empfang der Gäste mit Drinks & Snacks.</p>
                    </motion.div>

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



                <motion.div {...fadeInUp} className="location-details">
                    <MapPin className="w-8 h-8 text-primary mx-auto mb-4" />
                    <h3 className="text-2xl font-serif mb-2">Am Peterborn 2</h3>
                    <p className="text-text-light mb-4">99428 Nohra, Deutschland</p>
                    <a href="https://maps.google.com/?q=Am+Peterborn+2,+99428+Nohra,+Deutschland" target="_blank" rel="noopener noreferrer" className="btn-primary">
                        Karte anzeigen
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
