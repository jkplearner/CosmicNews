import React from 'react';
import Particles from '../../../Backgrounds/Particles/Particles';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">🌌 Cosmic News</div>
        <ul className="nav-links">
          <li><a href="/dashboard">Dashboard</a></li>
          <li><a href="/login">Login</a></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <Particles />
        </div>
        <div className="hero-content">
          <h1>Your Daily Window to the Cosmos</h1>
          <p>Discover daily cosmic images, real-time space weather, celestial events & more.</p>
          <div className="hero-buttons">
            <a href="/dashboard" className="primary-btn">Explore Now</a>
            <a href="/login" className="secondary-btn">Login</a>
          </div>
        </div>
      </section>

      {/* Features Section */}
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

      {/* Subscribe Section */}
      <section className="subscribe-section">
        <h2>Get monthly cosmic highlights straight to your inbox!</h2>
        <form className="subscribe-form">
          <input type="email" placeholder="Enter your email" />
          <button type="submit">Subscribe</button>
        </form>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Cosmic News. All rights reserved.</p>
        <div className="footer-links">
          <a href="/about">About</a>
          <a href="/privacy">Privacy</a>
          <a href="/contact">Contact</a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;