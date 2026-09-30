import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ExhibitionContext } from "../context/ExhibitionContext";

function Application() {
  const navigate = useNavigate();
  const { 
    selectedExhibition, 
    selectedStallId, 
    currentVendorApplication, 
    submitStallApplication 
  } = useContext(ExhibitionContext);

  const [submitted, setSubmitted] = useState(false);
  const [appId, setAppId] = useState("");

  const stallObj = (selectedExhibition.stalls || []).find((s) => s.id === selectedStallId) || { price: 6500 };

  const handleFinalSubmit = () => {
    const createdApp = submitStallApplication({
      exhibitionId: selectedExhibition.id,
      exhibitionName: selectedExhibition.name,
      applicantName: currentVendorApplication.vendorName || "Artisan Vendor",
      email: currentVendorApplication.email || "vendor@market.com",
      productName: currentVendorApplication.productName || "Handmade Collection",
      productCategory: currentVendorApplication.productCategory || "Vintage & Fashion",
      productDescription: currentVendorApplication.productDescription || "",
      productImage: currentVendorApplication.productImage || "",
      stallNumber: selectedStallId || "A1"
    });

    setAppId(createdApp.id);
    setSubmitted(true);
  };

  return (
    <div>
      <Navbar />

      <main className="auth-container">
        <div className="glass-card auth-card" style={{ maxWidth: '600px' }}>
          <div className="auth-header">
            <div className="market-badge" style={{ marginBottom: '12px' }}>
              <span>📝</span> FINAL STEP: STALL APPLICATION REVIEW
            </div>
            <h2>Confirm Your Stall Booking</h2>
            <p>Review details before submitting application to event organizers.</p>
          </div>

          {!submitted ? (
            <div>
              <div style={{ background: 'rgba(10,10,25,0.7)', borderRadius: '16px', padding: '24px', border: '1px solid var(--border-color)', marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '12px', marginBottom: '12px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Exhibition Event:</span>
                  <strong style={{ color: 'var(--accent-amber)' }}>{selectedExhibition.name}</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '12px', marginBottom: '12px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Assigned Stall:</span>
                  <strong style={{ color: 'var(--accent-cyan)' }}>Stall {selectedStallId || 'A1'}</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '12px', marginBottom: '12px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Vendor / Brand:</span>
                  <strong>{currentVendorApplication.vendorName || "Artisan Brand"}</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '12px', marginBottom: '12px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Product Title:</span>
                  <strong>{currentVendorApplication.productName || "Craft Collection"}</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '12px', marginBottom: '12px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Category:</span>
                  <span className="badge badge-approved">{currentVendorApplication.productCategory}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '6px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Stall Rental Price:</span>
                  <strong style={{ fontSize: '18px', color: 'var(--accent-amber)' }}>₹{stallObj.price?.toLocaleString()}</strong>
                </div>
              </div>

              <button onClick={handleFinalSubmit} className="btn-neon" style={{ width: '100%', padding: '16px', fontSize: '16px' }}>
                Submit Application to Organizer 🚀
              </button>
            </div>
          ) : (
            <div style={{ textAlignment: 'center', textAlign: 'center', padding: '20px 0' }}>
              <div style={{ fontSize: '56px', marginBottom: '16px' }}>🎉</div>
              <h3 style={{ fontSize: '24px', marginBottom: '10px', color: 'var(--accent-green)' }}>
                Application Submitted Successfully!
              </h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '24px', lineHeight: '1.6' }}>
                Your application <strong>#{appId}</strong> has been sent to the exhibition organizers. 
                Once approved, you will be able to complete payment to lock Stall {selectedStallId}.
              </p>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <Link to="/payment" className="btn-primary">
                  Proceed to Payment Gateway 💳
                </Link>
                <Link to="/hub" className="btn-outline">
                  Return to Hub 🏠
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Application;