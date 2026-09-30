import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <div className="home-page">
      <Navbar />

      <main className="hero-entrance">
        <div className="market-badge">
          <span>✨</span>
          <span>NIGHT FLEA MARKET EDITION</span>
          <span>🏮</span>
        </div>

        <h1 className="hero-title">
          Step Into The Glowing World Of <br />
          <span className="gradient-text">Midnight Flea Markets</span>
        </h1>

        <p className="hero-subtitle">
          Connect organizers, artisanal stall vendors, and eager visitors under one magical roof. 
          Discover unique crafts, food trucks, and vibrant evening exhibitions!
        </p>

        <div style={{ marginTop: '20px' }}>
          <Link to="/hub" className="enter-market-btn">
            Enter the Market 🏮
          </Link>
        </div>

        {/* Ambient Decorative Highlights */}
        <div 
          style={{
            marginTop: '60px',
            display: 'flex',
            gap: '30px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            color: 'var(--text-muted)',
            fontSize: '14px'
          }}
        >
          <div>✨ 50+ Artisanal Brands</div>
          <div>🎶 Live Acoustic Sessions</div>
          <div>🍔 Gourmet Street Eats</div>
          <div>📍 Bandra & Goregaon Grounds</div>
        </div>
      </main>
    </div>
  );
}

export default Home;