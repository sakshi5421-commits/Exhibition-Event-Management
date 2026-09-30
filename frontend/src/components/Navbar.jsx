import React from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  return (
    <>
      <div className="fairy-string">
        <div className="fairy-light"></div>
        <div className="fairy-light"></div>
        <div className="fairy-light"></div>
        <div className="fairy-light"></div>
        <div className="fairy-light"></div>
        <div className="fairy-light"></div>
      </div>
      
      <nav className="market-nav">
        <Link to="/" className="nav-brand">
          <span className="nav-brand-logo">🏮</span>
          <span className="gradient-text">ExhiConnect</span>
        </Link>

        <div className="nav-links">
          <Link 
            to="/hub" 
            className={`nav-link ${location.pathname === '/hub' ? 'active' : ''}`}
          >
            🏠 Market Hub
          </Link>

          <Link 
            to="/organizer/login" 
            className={`nav-link ${location.pathname.startsWith('/organizer') ? 'active' : ''}`}
          >
            🎪 Organizer
          </Link>

          <Link 
            to="/bookstall" 
            className={`nav-link ${location.pathname.includes('stall') || location.pathname.includes('vendor') ? 'active' : ''}`}
          >
            🏪 Book Stall
          </Link>

          <Link 
            to="/exhibitions" 
            className={`nav-link ${location.pathname.includes('exhibition') ? 'active' : ''}`}
          >
            🛍️ Explore Market
          </Link>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <Link to="/organizer/login" className="btn-outline">
            Organizer Portal
          </Link>
          <Link to="/bookstall" className="btn-primary">
            Book Stall ✨
          </Link>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
