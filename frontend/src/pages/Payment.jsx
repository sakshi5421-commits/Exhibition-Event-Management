import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ExhibitionContext } from "../context/ExhibitionContext";

function Payment() {
  const { selectedExhibition, selectedStallId } = useContext(ExhibitionContext);
  const [paid, setPaid] = useState(false);

  const stallObj = (selectedExhibition.stalls || []).find((s) => s.id === selectedStallId) || { price: 6500 };

  return (
    <div>
      <Navbar />

      <main className="auth-container">
        <div className="glass-card auth-card">
          <div className="auth-header">
            <div style={{ fontSize: '42px', marginBottom: '10px' }}>💳</div>
            <h2>Stall Payment Gateway</h2>
            <p>Secure stall reservation for {selectedExhibition.name}</p>
          </div>

          {!paid ? (
            <div>
              <div style={{ background: 'rgba(10,10,25,0.7)', borderRadius: '16px', padding: '20px', border: '1px solid var(--border-color)', marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Assigned Stall:</span>
                  <strong style={{ color: 'var(--accent-amber)' }}>Stall {selectedStallId || 'A1'}</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Exhibition:</span>
                  <span>{selectedExhibition.name}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Application Status:</span>
                  <span className="badge badge-approved">Approved ✅</span>
                </div>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '10px', marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: '700' }}>Total Amount Payable:</span>
                  <strong style={{ fontSize: '20px', color: 'var(--accent-green)' }}>
                    ₹{stallObj.price?.toLocaleString()}
                  </strong>
                </div>
              </div>

              <div className="form-group">
                <label>Select Payment Mode</label>
                <select className="form-select">
                  <option>UPI / GPay / PhonePe</option>
                  <option>Credit / Debit Card</option>
                  <option>Net Banking</option>
                </select>
              </div>

              <button onClick={() => setPaid(true)} className="btn-primary" style={{ width: '100%', padding: '15px' }}>
                Pay ₹{stallObj.price?.toLocaleString()} & Confirm Booking →
              </button>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ fontSize: '50px', marginBottom: '12px' }}>✨</div>
              <h3 style={{ fontSize: '24px', color: 'var(--accent-green)', marginBottom: '8px' }}>
                Payment Received & Stall Confirmed!
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '24px' }}>
                Your stall pass for <strong>Stall {selectedStallId || 'A1'}</strong> at <strong>{selectedExhibition.name}</strong> is locked and ready.
              </p>
              <Link to="/hub" className="btn-neon">
                Return to Market Plaza 🏠
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Payment;