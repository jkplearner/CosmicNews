import React, { useEffect, useState, useRef } from 'react';
import './Dashboard.css';
import Particles from '../../../Backgrounds/Particles/Particles';

const getUserFromLocalStorage = () => {
  try {
    const stored = localStorage.getItem('cosmicUser');
    if (stored && stored !== 'undefined') return JSON.parse(stored);
  } catch (error) {
    console.error('Failed to parse user from localStorage:', error);
  }
  return null;
};

const Dashboard = () => {
  const [apodData, setApodData] = useState(null);
  const [spaceWeather, setSpaceWeather] = useState(null);
  const [newsArticles, setNewsArticles] = useState([]);
  const carouselRef = useRef();
  const user = getUserFromLocalStorage();

  // Fetch NASA APOD
  useEffect(() => {
    const fetchApod = async () => {
      const fetchWithTimeout = (url, options, timeout = 15000) => {
        return Promise.race([
          fetch(url, options),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Request timed out")), timeout)
          ),
        ]);
      };

      try {
        // 1️⃣ Try official NASA APOD
        const res = await fetchWithTimeout(
          `https://api.nasa.gov/planetary/apod?api_key=${import.meta.env.VITE_NASA_API_KEY}`,
          {},
          15000
        );

        if (!res.ok) throw new Error("NASA APOD unavailable");
        const data = await res.json();
        setApodData(data);
      } catch (err1) {
        console.warn("NASA APOD failed:", err1.message);

        try {
          // 2️⃣ Try community APOD mirror
          const res = await fetchWithTimeout("https://apod.ellanan.com/api", {}, 15000);
          const data = await res.json();
          setApodData(data);
        } catch (err2) {
          console.warn("Mirror APOD failed:", err2.message);

          try {
            // 3️⃣ Final fallback — NASA Image Library (random space image)
            const res = await fetchWithTimeout(
              "https://images-api.nasa.gov/search?q=space&media_type=image",
              {},
              10000
            );
            const data = await res.json();
            const randomItem =
              data.collection.items[
              Math.floor(Math.random() * data.collection.items.length)
              ];
            const url = randomItem.links?.[0]?.href;
            const title = randomItem.data?.[0]?.title;
            const desc = randomItem.data?.[0]?.description;
            setApodData({ url, title, explanation: desc });
          } catch (err3) {
            console.error("All APOD sources failed:", err3.message);
            setApodData({
              url: "https://apod.nasa.gov/apod/image/1901/IC405_Abolfath_3952.jpg",
              title: "Fallback: Flaming Star Nebula",
              explanation:
                "All APOD sources are temporarily unavailable. This is a backup image.",
            });
          }
        }
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
        carouselRef.current.scrollBy({ left: 400, behavior: 'smooth' });
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
            {user ? (
              <>
                <a href="/channels">Channels</a>
                <a href="https://cosmicnexus360.vercel.app/">Cosmic Nexus</a>
                <button
                  className="link-button"
                  onClick={() => {
                    localStorage.removeItem('cosmicUser');
                    window.location.href = '/';
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <a href="/login">Login to access channels and cosmic nexus</a>
            )}
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
