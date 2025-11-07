import React, { useEffect, useState } from "react";
import "./Channels.css";
import Particles from "../../../Backgrounds/Particles/Particles";

function Channels() {
  const [stars, setStars] = useState([]);
  const [galaxies, setGalaxies] = useState([]);
  const [nebulae, setNebulae] = useState([]);
  const [neos, setNeos] = useState([]);
  const [missions, setMissions] = useState([]);

  const cleanDescription = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  const fetchHighResAssets = async (items) => {
    return await Promise.all(
      items.map(async (item) => {
        try {
          if (item.href) {
            const assetRes = await fetch(item.href);
            const assetUrls = await assetRes.json();
            const highResUrl =
              assetUrls.find(
                (url) =>
                  url.endsWith("~orig.jpg") || url.endsWith("~large.jpg")
              ) || assetUrls[0];
            return { ...item, highResUrl };
          }
        } catch (error) {
          console.error("Error fetching high-res asset:", error);
        }
        return { ...item, highResUrl: null };
      })
    );
  };

  useEffect(() => {
    const fetchStars = async () => {
      try {
        const res = await fetch("https://images-api.nasa.gov/search?q=star");
        const data = await res.json();
        const items = data.collection.items.slice(0, 5);
        const highResItems = await fetchHighResAssets(items);
        setStars(highResItems);
      } catch (error) {
        console.error("Error fetching stars:", error);
      }
    };

    const fetchGalaxies = async () => {
      try {
        const res = await fetch("https://images-api.nasa.gov/search?q=galaxy");
        const data = await res.json();
        const items = data.collection.items.slice(0, 5);
        const highResItems = await fetchHighResAssets(items);
        setGalaxies(highResItems);
      } catch (error) {
        console.error("Error fetching galaxies:", error);
      }
    };

    const fetchNebulae = async () => {
      try {
        const res = await fetch("https://images-api.nasa.gov/search?q=nebula");
        const data = await res.json();
        const items = data.collection.items.slice(0, 5);
        const highResItems = await fetchHighResAssets(items);
        setNebulae(highResItems);
      } catch (error) {
        console.error("Error fetching nebulae:", error);
      }
    };

    const fetchNEOs = async () => {
      try {
        const res = await fetch(
          `https://api.nasa.gov/neo/rest/v1/feed?start_date=2025-11-01&end_date=2025-11-07&api_key=${import.meta.env.VITE_NASA_API_KEY}`
        );
        const data = await res.json();
        const neosArray = Object.values(data.near_earth_objects).flat().slice(0, 5);
        setNeos(neosArray);
      } catch (error) {
        console.error("Error fetching Near Earth Objects:", error);
      }
    };

    const fetchMissions = async () => {
      try {
        const res = await fetch(
          "https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=5"
        );
        const data = await res.json();
        setMissions(data.results);
      } catch (error) {
        console.error("Error fetching missions:", error);
      }
    };

    fetchStars();
    fetchGalaxies();
    fetchNebulae();
    fetchNEOs();
    fetchMissions();
  }, []);

  return (
    <div className="channels">
      <div className="particles-container">
        <Particles />
      </div>

      <div className="channels-content">
        <h1>🚀 Cosmic Channels</h1>

        {/* ✨ Stars */}
        <section className="channel-section">
          <h2>✨ Stars</h2>
          {stars.length ? (
            stars.map((item, idx) => (
              <div key={idx}>
                <p><strong>{item.data[0].title}</strong></p>
                {item.highResUrl && (
                  <img src={item.highResUrl} alt={item.data[0].title} width="600" />
                )}
                <p>{cleanDescription(item.data[0].description) || "No description available."}</p>
              </div>
            ))
          ) : (
            <p>Loading stars...</p>
          )}
        </section>

        {/* 🌌 Galaxies */}
        <section className="channel-section">
          <h2>🌌 Galaxies</h2>
          {galaxies.length ? (
            galaxies.map((item, idx) => (
              <div key={idx}>
                <p><strong>{item.data[0].title}</strong></p>
                {item.highResUrl && (
                  <img src={item.highResUrl} alt={item.data[0].title} width="600" />
                )}
                <p>{cleanDescription(item.data[0].description) || "No description available."}</p>
              </div>
            ))
          ) : (
            <p>Loading galaxies...</p>
          )}
        </section>

        {/* 🌫️ Nebulae */}
        <section className="channel-section">
          <h2>🌫️ Nebulae</h2>
          {nebulae.length ? (
            nebulae.map((item, idx) => (
              <div key={idx}>
                <p><strong>{item.data[0].title}</strong></p>
                {item.highResUrl && (
                  <img src={item.highResUrl} alt={item.data[0].title} width="600" />
                )}
                <p>{cleanDescription(item.data[0].description) || "No description available."}</p>
              </div>
            ))
          ) : (
            <p>Loading nebulae...</p>
          )}
        </section>

        {/* 🌍 Near Earth Objects */}
        <section className="channel-section">
          <h2>🌍 Near-Earth Objects (Asteroids)</h2>
          {neos.length ? (
            <div className="neos-grid">
              {neos.map((neo, idx) => (
                <div key={idx} className="neo-card">
                  <h3>{neo.name}</h3>
                  <p>
                    Status:{" "}
                    <span
                      style={{
                        color: neo.is_potentially_hazardous_asteroid
                          ? "#ff4d4d"
                          : "#66ff99",
                        fontWeight: "bold",
                      }}
                    >
                      {neo.is_potentially_hazardous_asteroid
                        ? "Hazardous"
                        : "Safe"}
                    </span>
                  </p>
                  <p>
                    Diameter:{" "}
                    {neo.estimated_diameter.kilometers.estimated_diameter_max.toFixed(3)} km
                  </p>
                  <p>
                    Velocity:{" "}
                    {parseFloat(
                      neo.close_approach_data[0]?.relative_velocity
                        ?.kilometers_per_hour
                    ).toFixed(2)}{" "}
                    km/h
                  </p>
                  <p>
                    Miss Distance:{" "}
                    {parseFloat(
                      neo.close_approach_data[0]?.miss_distance?.kilometers
                    ).toFixed(0)}{" "}
                    km
                  </p>
                  <p>
                    Date:{" "}
                    {neo.close_approach_data[0]?.close_approach_date_full || "N/A"}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p>Loading Near-Earth Objects...</p>
          )}
        </section>

        {/* 🚀 Upcoming Missions */}
        <section className="channel-section">
          <h2>🚀 Upcoming Missions</h2>
          {missions.length ? (
            missions.map((mission, idx) => (
              <div key={idx}>
                <p>
                  <strong>{mission.name}</strong> —{" "}
                  {new Date(mission.net).toLocaleString()}
                </p>
                <p>Provider: {mission.launch_service_provider?.name}</p>
                <p>{mission.mission?.description || "No description available."}</p>
              </div>
            ))
          ) : (
            <p>Loading missions...</p>
          )}
        </section>
      </div>
    </div>
  );
}

export default Channels;
