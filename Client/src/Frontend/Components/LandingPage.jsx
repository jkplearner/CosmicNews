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
          <h1>Unlock the Secrets of the Universe</h1>
          <p>Get breathtaking cosmic images, live space weather updates — delivered daily just for you.</p>
          <div className="hero-buttons">
            <a href="/dashboard" className="primary-btn">Explore Now</a>
            {user ? (
              <button className="secondary-btn" onClick={logoutHandler}>Logout</button>
            ) : (
              <a href="/login" className="secondary-btn">Join Now — It’s Free</a>
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
          <h3>🚀 Upcoming Missions</h3>
          <p>Stay updated on upcoming rocket launches, space missions, and cutting-edge explorations beyond Earth.</p>
        </div>
      </section>

      <section className="login-feature-section">
        <div className="login-feature-content">
          <h2>🔓 Become a Cosmic Insider</h2>
          <p>Sign up to unlock personalized channels featuring stars, galaxies, nebulae, Mars photos, and upcoming missions tailored to your interests.</p>
          <a href="/login" className="login-feature-btn">
            {user ? 'Explore Your Channels' : 'Join Now — It’s Free'}
          </a>
        </div>
      </section>

      <footer className="footer">
        <p>© 2025 Cosmic News. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
