import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function MarketHub() {
  return (
    <div>
      <Navbar />

      <main className="hub-section">
        <div className="section-header">
          <div className="market-badge" style={{ marginBottom: '16px' }}>
            <span>🏮</span> WELCOME TO THE MARKET PLAZA
          </div>
          <h2>Choose Your Gateway</h2>
          <p>Select your role to access management tools, vendor bookings, or visitor exploration.</p>
        </div>

        <div className="options-grid">
          {/* OPTION 1: EXHIBITION ORGANIZER */}
          <Link to="/organizer/login" className="glass-card option-card">
            <div>
              <div className="option-icon-box">
                🎪
              </div>
              <span className="badge badge-pending" style={{ marginBottom: '12px' }}>
                FOR ORGANIZERS
              </span>
              <h3>Exhibition Organizer</h3>
              <p>
                Create, organize, and manage your Night Flea Markets. Input venue details, timings, location maps, hall configurations, and approve stall vendors.
              </p>
            </div>
            <div className="option-action">
              Access Organizer Portal <span>→</span>
            </div>
          </Link>

          {/* OPTION 2: BOOK A STALL */}
          <Link to="/vendor/login" className="glass-card option-card">
            <div>
              <div className="option-icon-box">
                🏪
              </div>
              <span className="badge badge-approved" style={{ marginBottom: '12px' }}>
                FOR VENDORS & EXHIBITORS
              </span>
              <h3>Book a Stall</h3>
              <p>
                Sign in to showcase your products! Explore 2D interactive floor plans, pick your preferred stall location, and submit product details for quick approval.
              </p>
            </div>
            <div className="option-action">
              Book Your Stall Now <span>→</span>
            </div>
          </Link>

          {/* OPTION 3: EXPLORE EXHIBITION */}
          <Link to="/exhibitions" className="glass-card option-card">
            <div>
              <div className="option-icon-box">
                🛍️
              </div>
              <span className="badge" style={{ background: 'rgba(0,240,255,0.15)', color: 'var(--accent-cyan)', border: '1px solid var(--accent-cyan)', marginBottom: '12px' }}>
                FOR VISITORS
              </span>
              <h3>Explore Exhibition</h3>
              <p>
                Browse live and upcoming Night Flea Markets. Preview venue maps, hall layouts, stall arrangements, and inspect products available at each stall before visiting!
              </p>
            </div>
            <div className="option-action">
              Explore Exhibitions <span>→</span>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default MarketHub;
