import React, { useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ExhibitionContext } from "../context/ExhibitionContext";

function VisitExhibition() {
  const { id } = useParams();
  const { exhibitions } = useContext(ExhibitionContext);

  const exhibition = exhibitions.find((e) => e.id === id) || exhibitions[0];

  const [activeCategory, setActiveCategory] = useState("All");
  const [activeStallFilter, setActiveStallFilter] = useState("All");

  const categories = ["All", ...(exhibition.categories || [])];
  const stalls = exhibition.stalls || [];
  const halls = exhibition.halls || [];
  const products = exhibition.products || [];

  // Filter products by selected category or stall
  const filteredProducts = products.filter((p) => {
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    const matchesStall = activeStallFilter === "All" || p.stallId === activeStallFilter;
    return matchesCategory && matchesStall;
  });

  return (
    <div>
      <Navbar />

      <main className="hub-section">
        {/* HERO BANNER FOR EXHIBITION */}
        <div className="glass-card" style={{ padding: '40px', marginBottom: '40px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
            <div style={{ maxWidth: '700px' }}>
              <div className="market-badge" style={{ marginBottom: '16px' }}>
                <span>🏮</span> LIVE NIGHT FLEA MARKET PREVIEW
              </div>
              <h1 style={{ fontSize: '42px', marginBottom: '12px' }}>{exhibition.name}</h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '18px', lineHeight: '1.6', marginBottom: '24px' }}>
                {exhibition.description}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', fontSize: '15px' }}>
                <div>📍 <strong>Venue:</strong> {exhibition.venue}</div>
                <div>🗺️ <strong>Location:</strong> {exhibition.location}</div>
                <div>📅 <strong>Date:</strong> {exhibition.date}</div>
                <div>⏰ <strong>Timing:</strong> {exhibition.timing}</div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a 
                href={exhibition.mapUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-primary" 
                style={{ textAlign: 'center' }}
              >
                🗺️ Open Venue Google Map →
              </a>
              <Link to="/bookstall" className="btn-outline" style={{ textAlign: 'center' }}>
                🏪 Want to Exhibit Here?
              </Link>
            </div>
          </div>
        </div>

        {/* SECTION 1: HALL DETAILS & MAP OVERVIEW */}
        <div className="dashboard-grid" style={{ marginBottom: '40px' }}>
          {/* HALL DETAILS */}
          <div className="glass-card" style={{ padding: '32px' }}>
            <h2 style={{ fontSize: '24px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              🏛️ Exhibition Hall Details
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {halls.map((h) => (
                <div 
                  key={h.id} 
                  style={{ 
                    padding: '16px', 
                    background: 'rgba(255,255,255,0.04)', 
                    borderRadius: '14px', 
                    border: '1px solid var(--border-color)' 
                  }}
                >
                  <div style={{ fontSize: '18px', fontWeight: '700', color: 'var(--accent-amber)', marginBottom: '4px' }}>
                    {h.name}
                  </div>
                  <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                    Theme: <strong style={{ color: 'var(--text-main)' }}>{h.theme}</strong> | Capacity: <strong>{h.capacity}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* STALL DETAILS & MAP HIGHLIGHTS */}
          <div className="glass-card" style={{ padding: '32px' }}>
            <h2 style={{ fontSize: '24px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              🏪 Interactive Stall Details & Vendors
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '16px' }}>
              Click any stall below to filter products sold at that specific stall!
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '12px', maxHeight: '300px', overflowY: 'auto', paddingRight: '8px' }}>
              <div 
                onClick={() => setActiveStallFilter("All")}
                style={{
                  padding: '12px',
                  borderRadius: '10px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  background: activeStallFilter === "All" ? 'rgba(255,184,48,0.25)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${activeStallFilter === "All" ? 'var(--accent-amber)' : 'var(--border-color)'}`
                }}
              >
                <div style={{ fontWeight: '800' }}>All Stalls</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>Show all products</div>
              </div>

              {stalls.map((s) => (
                <div 
                  key={s.id}
                  onClick={() => setActiveStallFilter(s.id)}
                  style={{
                    padding: '12px',
                    borderRadius: '10px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    background: activeStallFilter === s.id ? 'rgba(255,184,48,0.25)' : s.status === 'booked' ? 'rgba(124, 58, 237, 0.15)' : 'rgba(255,255,255,0.02)',
                    border: `1px solid ${activeStallFilter === s.id ? 'var(--accent-amber)' : 'var(--border-color)'}`
                  }}
                >
                  <div style={{ fontWeight: '800', color: s.status === 'booked' ? 'var(--accent-cyan)' : 'var(--text-main)' }}>
                    Stall {s.id}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {s.vendor || "Available Stall"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 2: PRODUCTS AVAILABLE AT DIFFERENT STALLS */}
        <div style={{ marginTop: '50px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', marginBottom: '24px' }}>
            <div>
              <h2 style={{ fontSize: '32px' }}>🛍️ Products Available at Exhibition</h2>
              <p style={{ color: 'var(--text-muted)' }}>
                Explore products available across different stalls before visiting!
              </p>
            </div>

            {/* CATEGORY FILTERS */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={activeCategory === cat ? "btn-primary" : "btn-outline"}
                  style={{ padding: '8px 16px', fontSize: '13px', borderRadius: '20px' }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="glass-card" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
              <h3>No products found for this filter criteria.</h3>
              <p style={{ marginTop: '8px' }}>Try switching categories or selecting "All Stalls".</p>
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map((prod) => (
                <div key={prod.id} className="product-card">
                  <img src={prod.image} alt={prod.title} className="product-img" />
                  <div className="product-info">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span className="product-stall-tag">
                        🏪 Stall {prod.stallId}
                      </span>
                      <span style={{ fontSize: '12px', color: 'var(--accent-pink)', fontWeight: '600' }}>
                        {prod.category}
                      </span>
                    </div>

                    <h3 className="product-title">{prod.title}</h3>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                      Vendor: <strong>{prod.vendorName}</strong>
                    </div>

                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '16px' }}>
                      {prod.description}
                    </p>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div className="product-price">{prod.price}</div>
                      <button 
                        className="btn-outline" 
                        style={{ padding: '6px 12px', fontSize: '12px' }}
                        onClick={() => alert(`Saved ${prod.title} at Stall ${prod.stallId} to your Night Market Visit Guide!`)}
                      >
                        ❤️ Save to Guide
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default VisitExhibition;
