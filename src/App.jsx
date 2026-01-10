import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import InfoSection from './components/InfoSection';
import Travel from './components/Travel';
import Rsvp from './components/Rsvp';
import Faq from './components/Faq';
import Admin from './components/Admin';

import PasswordProtection from './components/PasswordProtection';

import { useState, useEffect } from 'react';

function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('site_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleUnlock = () => {
    setIsAuthenticated(true);
    localStorage.setItem('site_auth', 'true');
  };

  return (
    <div style={{ backgroundColor: 'var(--color-secondary)', minHeight: '100vh' }}>
      <Hero isLocked={!isAuthenticated} onUnlock={handleUnlock} />
      {isAuthenticated && (
        <>
          <InfoSection />
          <Travel />
          <Faq />
          <Rsvp />
          <footer style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-light)', fontSize: '0.875rem' }}>
            <p>&copy; 2026 Julia & Max. Mit Liebe gemacht.</p>
          </footer>
        </>
      )}
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
