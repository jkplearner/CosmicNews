import React from 'react';
import Particles from '../../../Backgrounds/Particles/Particles';
import './LandingPage.css';

const getUserFromLocalStorage = () => {
  try {
    const stored = localStorage.getItem('cosmicUser');
    if (stored && stored !== 'undefined') return JSON.parse(stored);
  } catch (error) {
    console.error('Failed to parse user from localStorage:', error);
  }
  return null;
};

const LandingPage = () => {
  const user = getUserFromLocalStorage();

  const logoutHandler = () => {
    localStorage.removeItem('cosmicUser');
    window.location.href = '/';
  };

  return (
    <div className="landing-page">
      <nav className="navbar">
        <div className="logo">🌌 Cosmic News</div>
        <ul className="nav-links">
          <li><a href="/dashboard">Dashboard</a></li>
          {user && <li><a href="/channels">Channels</a></li>}
          <li>
            {user ? (
              <button className="link-button" onClick={logoutHandler}>Logout</button>
            ) : (
              <a href="/login">Login</a>
            )}
          </li>
        </ul>
      </nav>

      <section className="hero">
        <div className="hero-background">
          <Particles />
        </div>
        <div className="hero-content">
          <h1>Your Daily Window to the Cosmos</h1>
          <p>Discover daily cosmic images, real-time space weather, celestial events & more.</p>
          <div className="hero-buttons">
            <a href="/dashboard" className="primary-btn">Explore Now</a>
            {user ? (
              <button className="secondary-btn" onClick={logoutHandler}>Logout</button>
            ) : (
              <a href="/login" className="secondary-btn">Login</a>
            )}
          </div>
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <h3>🌠 Daily Cosmic Images</h3>
          <p>See the universe like never before with stunning photos from NASA/ESA.</p>
        </div>
        <div className="feature-card">
          <h3>☀️ Space Weather Alerts</h3>
          <p>Stay informed about solar flares and geomagnetic storms in real-time.</p>
        </div>
        <div className="feature-card">
          <h3>🌌 Celestial Events</h3>
          <p>Don't miss eclipses, meteor showers, and rare cosmic events.</p>
        </div>
      </section>

      <section className="login-feature-section">
        <div className="login-feature-content">
          <h2>🔓 Login to Unlock Channels Feature</h2>
          <p>Access exclusive cosmic channels and personalized content</p>
          <a href="/login" className="login-feature-btn">{user ? 'Go to Channels' : 'Login / Sign Up'}</a>
        </div>
      </section>

      <footer className="footer">
        <p>© 2025 Cosmic News. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
