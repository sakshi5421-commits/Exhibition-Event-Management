import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ExhibitionContext } from "../context/ExhibitionContext";

function StallMap() {
  const navigate = useNavigate();
  const { selectedExhibition, selectedStallId, setSelectedStallId } = useContext(ExhibitionContext);

  const stalls = selectedExhibition.stalls || [];
  const selectedStallObj = stalls.find((s) => s.id === selectedStallId);

  const handleProceed = () => {
    if (!selectedStallId) {
      alert("Please click an available stall to select it first.");
      return;
    }
    navigate("/productdetails");
  };

  return (
    <div>
      <Navbar />

      <main className="hub-section" style={{ maxWidth: '1000px' }}>
        <div className="section-header">
          <div className="market-badge" style={{ marginBottom: '16px' }}>
            <span>📍</span> INTERACTIVE FLOORPLAN MAP
          </div>
          <h2>{selectedExhibition.name}</h2>
          <p>
            📍 {selectedExhibition.venue}, {selectedExhibition.location} | ⏰ {selectedExhibition.timing}
          </p>
        </div>

        {/* LEGEND */}
        <div className="glass-card" style={{ padding: '16px 24px', marginBottom: '24px', display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap', fontSize: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }}></span>
            <span>Available Stall</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#ffb830', display: 'inline-block' }}></span>
            <span>Your Selected Stall</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '14px', height: '14px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'inline-block' }}></span>
            <span>Booked Stall</span>
          </div>
        </div>

        {/* 2D MAP CONTAINER */}
        <div className="map-container">
          <div className="floor-zone entrance-zone">
            🚪 MAIN ENTRANCE & FAIRY LIGHT ARCHWAY 🚪
          </div>

          <div className="floorplan">
            {stalls.map((stall) => {
              const isSelected = selectedStallId === stall.id;
              const isBooked = stall.status === 'booked';

              let classNames = "stall-box";
              if (isBooked) classNames += " booked";
              else if (isSelected) classNames += " selected";
              else classNames += " available";

              return (
                <div
                  key={stall.id}
                  className={classNames}
                  onClick={() => {
                    if (!isBooked) {
                      setSelectedStallId(stall.id);
                    }
                  }}
                >
                  <div style={{ fontWeight: '800', fontSize: '18px' }}>
                    Stall {stall.id}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
                    {stall.hall}
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--accent-amber)', fontWeight: '700', marginTop: '6px' }}>
                    ₹{stall.price.toLocaleString()}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-dim)', marginTop: '2px' }}>
                    {stall.size}
                  </div>
                  {isBooked && (
                    <div style={{ fontSize: '11px', color: '#ef4444', fontWeight: '700', marginTop: '4px' }}>
                      🔴 Booked
                    </div>
                  )}
                  {isSelected && (
                    <div style={{ fontSize: '11px', color: '#00f0ff', fontWeight: '700', marginTop: '4px' }}>
                      ✨ Selected
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="floor-zone stage-zone" style={{ marginTop: '20px' }}>
            🎶 ACOUSTIC LIVE MUSIC STAGE & FOOD TRUCK ALLEY 🍔
          </div>

          <div className="floor-zone exit-zone" style={{ marginTop: '12px' }}>
            🚪 EMERGENCY EXIT & RESTROOM PASSAGE 🚪
          </div>
        </div>

        {/* SELECTED STALL SUMMARY BANNER */}
        <div className="glass-card" style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <h4 style={{ fontSize: '18px', marginBottom: '4px' }}>
              {selectedStallObj ? `Selected: Stall ${selectedStallObj.id} (${selectedStallObj.hall})` : "No stall selected yet"}
            </h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
              {selectedStallObj 
                ? `Size: ${selectedStallObj.size} | Stall Rental Fee: ₹${selectedStallObj.price.toLocaleString()}`
                : "Click on any green available stall box on the map above."}
            </p>
          </div>

          <button
            onClick={handleProceed}
            className={selectedStallObj ? "btn-neon" : "btn-outline"}
            disabled={!selectedStallObj}
            style={{ opacity: selectedStallObj ? 1 : 0.5, cursor: selectedStallObj ? 'pointer' : 'not-allowed' }}
          >
            Enter Product Details →
          </button>
        </div>
      </main>
    </div>
  );
}

export default StallMap;