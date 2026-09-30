import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ExhibitionContext } from "../context/ExhibitionContext";

function Exhibitions() {
  const { exhibitions, setSelectedExhibitionId } = useContext(ExhibitionContext);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredExhibitions = exhibitions.filter((e) =>
    e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Navbar />

      <main className="hub-section">
        <div className="section-header">
          <div className="market-badge" style={{ marginBottom: '16px' }}>
            <span>🛍️</span> VISITOR EXPLORATION DIRECTORY
          </div>
          <h2>Explore Night Flea Markets</h2>
          <p>Discover vibrant upcoming evening markets, view floorplans, stall layouts, and products available before visiting!</p>
        </div>

        <div style={{ maxWidth: '600px', margin: '0 auto 40px auto' }}>
          <input
            type="text"
            className="form-input"
            placeholder="🔍 Search exhibitions by name, city, or venue..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: '16px 20px', borderRadius: '16px', fontSize: '16px' }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '30px' }}>
          {filteredExhibitions.map((exhi) => {
            const productCount = (exhi.products || []).length;
            const stallCount = (exhi.stalls || []).length;
            return (
              <div key={exhi.id} className="glass-card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <span className="market-badge" style={{ margin: 0, padding: '4px 12px', fontSize: '12px' }}>
                      🌙 NIGHT MARKET
                    </span>
                    <span style={{ fontSize: '13px', color: 'var(--accent-amber)', fontWeight: '700' }}>
                      📅 {exhi.date}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '26px', marginBottom: '10px' }}>{exhi.name}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '16px', lineHeight: '1.5' }}>
                    {exhi.tagline || exhi.description}
                  </p>

                  <div style={{ padding: '14px', background: 'rgba(10,10,25,0.6)', borderRadius: '12px', border: '1px solid var(--border-color)', marginBottom: '20px', fontSize: '14px' }}>
                    <div style={{ marginBottom: '6px' }}>📍 <strong>Venue:</strong> {exhi.venue}, {exhi.location}</div>
                    <div style={{ marginBottom: '6px' }}>⏰ <strong>Timing:</strong> {exhi.timing}</div>
                    <div>🎪 <strong>Layout:</strong> {stallCount} Stalls | {productCount} Showcased Products</div>
                  </div>

                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '24px' }}>
                    {(exhi.categories || []).map((cat, idx) => (
                      <span key={idx} style={{ background: 'rgba(255,42,133,0.12)', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', color: 'var(--accent-pink)' }}>
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  to={`/visit-exhibition/${exhi.id}`}
                  onClick={() => setSelectedExhibitionId(exhi.id)}
                  className="btn-primary"
                  style={{ width: '100%', padding: '14px', fontSize: '15px', justifyContent: 'center' }}
                >
                  Visit Exhibition & Explore Products 🏮 →
                </Link>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default Exhibitions;