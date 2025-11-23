import React, { useState } from 'react';
import './Login.css';
import Particles from '../../../Backgrounds/Particles/Particles';
import API_URL from '../../api'; // Make sure you have api.js with your backend URL

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';  // ✅ fixed path
      const res = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || 'Something went wrong');
        return;
      }

      alert(data.message);

      if (isLogin) {
        localStorage.setItem('cosmicUser', JSON.stringify(data.user));
        window.location.href = '/dashboard'; // ✅ go to dashboard after login
      } else {
        // ✅ go back to login mode after signup success
        setIsLogin(true);
        setFormData({
          email: '',
          password: '',
          confirmPassword: '',
          name: ''
        });
      }

    } catch (error) {
      console.error('Error during authentication:', error);
      alert('Network error');
    }
  };



  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      name: ''
    });
  };

  return (
    <div className="login-page">
      <div className="login-background">
        <Particles />
      </div>

      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h1>🌌 Cosmic News</h1>
            <h2>{isLogin ? 'Welcome Back' : 'Join the Cosmic Journey'}</h2>
            <p>{isLogin ? 'Sign in to your account' : 'Create your account to explore the universe'}</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                required
              />
            </div>

            {!isLogin && (
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  required
                />
              </div>
            )}

            <button type="submit" className="login-btn">
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
            <p style={{ marginTop: '15px', fontSize: '0.85rem', fontStyle: 'italic', opacity: 0.7, textAlign: 'center', color: '#e0e0e0' }}>
              📡 Transmission delay expected: Deep space server waking up... Please allow up to 60 seconds for the first connection.
            </p>
          </form>

          <div className="login-footer">
            <p>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button type="button" className="toggle-btn" onClick={toggleMode}>
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>

          <div className="back-to-home">
            <a href="/">← Back to Home</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
