import React, { useState } from 'react';
import './Envelope.css';

export default function Envelope({ onOpen }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        if (isOpen) return;
        setIsOpen(true);
        // Wait for animation to finish before calling parent callback to unmount/hide
        setTimeout(() => {
            onOpen();
        }, 2200); // 1.2s delay + 1s fadeOut in CSS
    };

    return (
        <div className={`envelope-overlay ${isOpen ? 'vanish' : ''}`}>
            <div className={`envelope-container ${isOpen ? 'open' : ''}`}>
                <div className="envelope">
                    <div className={`flap ${isOpen ? 'open' : ''}`}></div>

                    <div className="pocket pocket-bottom"></div>
                    <div className="pocket pocket-left"></div>
                    <div className="pocket pocket-right"></div>

                    <div className="letter">
                        <h2>Julia & Max</h2>
                        <p>Einladung</p>
                    </div>

                    <div
                        className={`seal ${isOpen ? 'hidden' : ''}`}
                        onClick={handleOpen}
                    >
                        J&M
                    </div>
                </div>
            </div>
        </div>
    );
}
