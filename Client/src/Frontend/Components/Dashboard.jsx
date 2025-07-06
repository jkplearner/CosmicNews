import React, { useEffect, useState, useRef } from 'react';
import './Dashboard.css';
import Particles from '../../../Backgrounds/Particles/Particles';

const Dashboard = () => {
  const [apodData, setApodData] = useState(null);
  const [spaceWeather, setSpaceWeather] = useState(null);
  const [newsArticles, setNewsArticles] = useState([]);
  const carouselRef = useRef();

  // Fetch NASA APOD
  useEffect(() => {
    const fetchApod = async () => {
      try {
        const res = await fetch(
  `https://api.nasa.gov/planetary/apod?api_key=${import.meta.env.VITE_NASA_API_KEY}`
);

        const data = await res.json();
        setApodData(data);
      } catch (error) {
        console.error('Error fetching APOD:', error);
      }
    };
    fetchApod();
  }, []);

  // Fetch Space Weather
  useEffect(() => {
    const fetchSpaceWeather = async () => {
      try {
        const res = await fetch(
          'https://services.swpc.noaa.gov/json/planetary_k_index_1m.json'
        );
        const data = await res.json();
        const latest = data[data.length - 1];
        setSpaceWeather(latest);
      } catch (error) {
        console.error('Error fetching Space Weather:', error);
      }
    };
    fetchSpaceWeather();
  }, []);

  // Fetch NASA news
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(
          'https://api.rss2json.com/v1/api.json?rss_url=https://www.nasa.gov/rss/dyn/breaking_news.rss'
        );
        const data = await res.json();
        setNewsArticles(data.items.slice(0, 10));
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };
    fetchNews();
  }, []);

  // Auto-scroll carousel
  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        carouselRef.current.scrollBy({
          left: 400,
          behavior: 'smooth',
        });
      }
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const getStatus = (kp) => {
    if (kp >= 5) return 'Storm';
    if (kp >= 3) return 'Active';
    return 'Quiet';
  };

  return (
    <div className="dashboard">
      <div className="particles-container">
        <Particles />
      </div>

      <div className="dashboard-content-wrapper">
        {/* Navbar */}
        <header className="dashboard-navbar">
          <h1>🚀 Cosmic Dashboard</h1>
          <nav className="dashboard-nav-links">
            <a href="/blackholes">Blackholes</a>
            <a href="/subscriptions">Subscriptions</a>
          </nav>
        </header>

        {/* News Carousel */}
        <section className="news-carousel">
          <button
            className="carousel-btn"
            onClick={() =>
              carouselRef.current.scrollBy({ left: -400, behavior: 'smooth' })
            }
          >
            {'<'}
          </button>
          <div className="news-items" ref={carouselRef}>
            {newsArticles.length ? (
              newsArticles.map((article, idx) => (
                <div key={idx} className="news-article">
                  <a href={article.link} target="_blank" rel="noopener noreferrer">
                    {article.title}
                  </a>
                </div>
              ))
            ) : (
              <p>Loading news...</p>
            )}
          </div>
          <button
            className="carousel-btn"
            onClick={() =>
              carouselRef.current.scrollBy({ left: 400, behavior: 'smooth' })
            }
          >
            {'>'}
          </button>
        </section>

        {/* APOD Section */}
        <section className="dashboard-apod">
          <div className="dashboard-card apod-card">
            <h2>🌌 Astronomy Picture of the Day</h2>
            {apodData ? (
              <>
                <div className="apod-img-wrapper">
                  <img src={apodData.url} alt={apodData.title} />
                </div>
                <h3>{apodData.title}</h3>
                <p>{apodData.explanation}</p>
              </>
            ) : (
              <p>Loading APOD...</p>
            )}
          </div>
        </section>
      </div>

      {/* Space Weather Popup */}
      {spaceWeather && (
        <div className="space-weather-popup">
          ☀️ Space Weather: {getStatus(spaceWeather.kp_index)} (Kp: {spaceWeather.kp_index})
        </div>
      )}
    </div>
  );
};

export default Dashboard;