import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ExhibitionContext } from "../context/ExhibitionContext";

function BookStall() {
  const { exhibitions, setSelectedExhibitionId } = useContext(ExhibitionContext);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredExhibitions = exhibitions.filter((e) =>
    e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectExhibition = (id) => {
    setSelectedExhibitionId(id);
    navigate("/stallmap");
  };

  return (
    <div>
      <Navbar />

      <main className="hub-section">
        <div className="section-header">
          <div className="market-badge" style={{ marginBottom: '16px' }}>
            <span>🏪</span> EXHIBITOR STALL SELECTION
          </div>
          <h2>Book a Stall for Your Brand</h2>
          <p>Choose an upcoming Night Flea Market to showcase your products to thousands of visitors.</p>
        </div>

        <div style={{ maxWidth: '600px', margin: '0 auto 40px auto' }}>
          <input
            type="text"
            className="form-input"
            placeholder="🔍 Search exhibition by name, city, or venue..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: '16px 20px', borderRadius: '16px', fontSize: '16px' }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' }}>
          {filteredExhibitions.map((exhi) => {
            const availableStallsCount = (exhi.stalls || []).filter(s => s.status === 'available').length;
            return (
              <div key={exhi.id} className="glass-card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span className="badge badge-approved">
                      {availableStallsCount} Stalls Available
                    </span>
                    <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                      📅 {exhi.date}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '24px', marginBottom: '8px' }}>{exhi.name}</h3>
                  <p style={{ color: 'var(--accent-amber)', fontSize: '14px', marginBottom: '16px', fontWeight: '600' }}>
                    📍 {exhi.venue}, {exhi.location}
                  </p>

                  <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.6', marginBottom: '20px' }}>
                    ⏰ <strong>Timing:</strong> {exhi.timing} <br />
                    🎪 <strong>Organizer:</strong> {exhi.organizerName}
                  </p>

                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '24px' }}>
                    {(exhi.categories || []).map((cat, idx) => (
                      <span key={idx} style={{ background: 'rgba(255,255,255,0.06)', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', color: '#a78bfa' }}>
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleSelectExhibition(exhi.id)}
                  className="btn-neon"
                  style={{ width: '100%', padding: '14px', fontSize: '15px' }}
                >
                  View Floorplan & Choose Stall →
                </button>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default BookStall;