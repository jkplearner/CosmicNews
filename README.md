# 🌌 Cosmic News — Your Daily Window to the Universe

**Cosmic News** is a full-stack space exploration app delivering real-time cosmic insights. From Astronomy Picture of the Day (APOD) to solar activity, Mars Rover imagery, and upcoming space missions, users can explore the universe interactively — with beautiful visuals, responsive design, and optional personalized access through login.

---

## 🚀 Features

- 🌠 **Daily Cosmic Images** from NASA's APOD API
- ☀️ **Real-Time Space Weather Alerts**
- 🌌 **Dynamic News Carousel** using NASA Breaking News RSS
- 🚀 **Upcoming Missions** with launch provider info and timings
- 🔭 **Channels Access** for:
  - Stars, Galaxies, Nebulae with high-res images and descriptions
  - Mars Rover photos and Launchpad Missions
- 🔐 **Authentication System**: Sign up / login to access exclusive channels
- 🌑 **Dark-themed immersive UI** with animated particle backgrounds
- ⚛️ Built with **MERN Stack** (MongoDB Atlas, Express, React, Node.js)

---
## Update
🚀 [Client] Enhanced NASA data integration and reliability

- Replaced Mars Rover Photos section with Near-Earth Objects (NEO) data from NASA NeoWs API in Channels.jsx.
- Displayed asteroid details including hazard status, velocity, and close approach distance.
- Improved APOD (Astronomy Picture of the Day) fetch in Dashboard.jsx:
  • Added 10s timeout protection to avoid long waits.
  • Implemented multi-source fallback system:
      1. NASA Official APOD API
      2. Community mirror (apod.ellanan.com)
      3. NASA Image & Video Library (random image)
      4. Static Flaming Star Nebula backup
- Ensured client-side dashboard always shows valid content even if NASA services are down.
- Maintained existing Particles and UI layout without flow or animation changes.
- **New Feature**: Added "Cosmic Nexus" integration, linking to an external 3D space visualization app.
- **Security**: Implemented `PrivateRoute` protection for the `/channels` route to ensure exclusive access for logged-in users.

## 🛠️ Tech Stack

- **Frontend**: React + Vite + Tailored CSS + Particles.js
- **Backend**: Node.js + Express + MongoDB Atlas
- **Deployment**:
  - Frontend: Vercel
  - Backend: Render

---

## 📁 Folder Structure
```
cosmicnews/
├── Client/ # Frontend (React)
├── Server/ # Backend (Node + Express)
├── .env # API keys and MongoDB URI
└── README.md
```

## 📡 Live Demo

🔗 [https://cosmicnews.vercel.app](https://cosmicnews.vercel.app)

---

## 👨‍🚀 Getting Started Locally

1. Clone this repo  
2. Add your `.env` file with the following variables:

```env
VITE_NASA_API_KEY=your_nasa_api_key
MONGODB_URI=your_mongo_uri
```
Run Frontend
```
bash
cd Client
npm install
npm run dev
```
Run Backend
```
bash
cd Server
npm install
npm start
```

🛰️ Credits
NASA APIs: APOD, Mars Rover, RSS

Launch Library 2 by The Space Devs

Particle backgrounds inspired by reactbts
