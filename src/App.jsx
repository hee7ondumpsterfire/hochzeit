import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import InfoSection from './components/InfoSection';
import Travel from './components/Travel';
import Rsvp from './components/Rsvp';
import Faq from './components/Faq';
import Admin from './components/Admin';

function Home() {
  return (
    <div style={{ backgroundColor: 'var(--color-secondary)', minHeight: '100vh' }}>
      <Hero />
      <InfoSection />
      <Travel />
      <Faq />
      <Rsvp />
      <footer style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-light)', fontSize: '0.875rem' }}>
        <p>&copy; 2026 Julia & Max. Mit Liebe gemacht.</p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}
