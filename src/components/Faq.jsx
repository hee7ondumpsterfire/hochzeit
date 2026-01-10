import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import './Faq.css';

const faqs = [
    {
        question: "Gibt es einen Dresscode?",
        answer: "Wir wünschen uns festliche Kleidung (Creative Black Tie). Fühlt euch wohl, aber schick! Da die Zeremonie auf Rasen stattfindet, sind Pfennigabsätze vielleicht nicht die beste Wahl."
    },
    {
        question: "Was muss ich über die Location wissen?",
        answer: "Rustikales Alm-Feeling mitten in Thüringen! Die Land Alm Utzberg bietet eine gemütliche und gleichzeitig elegante Atmosphäre. Wir feiern in wunderschönen Räumlichkeiten und bei schönem Wetter auch im Außenbereich."
    },
    {
        question: "Sind Kinder eingeladen?",
        answer: "Ja, sehr gerne! Bringt eure Kinder mit oder nehmt euch einen freien Abend – ganz wie ihr möchtet."
    },
    {
        question: "Wie komme ich zur Location?",
        answer: "Die Adresse lautet: Am Peterborn 2, 99428 Nohra. Es gibt ausreichend Parkplätze direkt vor Ort. Wer eine Mitfahrgelegenheit sucht oder anbietet, meldet sich bitte direkt bei uns, damit wir Fahrgemeinschaften organisieren können."
    },
    {
        question: "Habt ihr einen Geschenkwunsch?",
        answer: "Eure Anwesenheit ist das schönste Geschenk für uns. Wenn ihr uns dennoch etwas schenken möchtet, würden wir uns über einen Beitrag zu unseren Flitterwochen freuen."
    },
    {
        question: "Bis wann muss ich zusagen?",
        answer: "Bitte gebt uns bis zum 1. Juni 2026 Bescheid, damit wir entsprechend planen können."
    }
];

export default function Faq() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleIndex = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="faq-section">
            <div className="faq-container">
                <h2 className="faq-title">Häufige Fragen (FAQ)</h2>
                <div className="accordion">
                    {faqs.map((faq, index) => (
                        <div key={index} className="accordion-item">
                            <button
                                className="accordion-header"
                                onClick={() => toggleIndex(index)}
                                aria-expanded={openIndex === index}
                            >
                                <span className="accordion-question">{faq.question}</span>
                                <ChevronDown className={`accordion-icon ${openIndex === index ? 'open' : ''}`} />
                            </button>
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="accordion-content"
                                    >
                                        <div className="accordion-body">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
