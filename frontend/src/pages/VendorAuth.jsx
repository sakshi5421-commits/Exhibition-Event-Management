import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ExhibitionContext } from "../context/ExhibitionContext";

function VendorAuth() {
  const navigate = useNavigate();
  const { setVendorUser } = useContext(ExhibitionContext);

  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    businessName: "",
    email: "",
    password: "",
    phone: "",
    category: "Vintage & Fashion"
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      alert("Please provide your email and password.");
      return;
    }

    setVendorUser(formData);
    navigate("/bookstall");
  };

  return (
    <div>
      <Navbar />

      <div className="auth-container">
        <div className="glass-card auth-card">
          <div className="auth-header">
            <div style={{ fontSize: '42px', marginBottom: '10px' }}>🏪</div>
            <h2>{isRegister ? "Register Vendor Account" : "Exhibitor & Vendor Login"}</h2>
            <p>Access Night Flea Market stall bookings</p>
          </div>

          <form onSubmit={handleSubmit}>
            {isRegister && (
              <div className="form-group">
                <label>Business / Brand Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Aura Vintage Store"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  required
                />
              </div>
            )}

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                className="form-input"
                placeholder="vendor@brand.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-input"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>

            {isRegister && (
              <>
                <div className="form-group">
                  <label>Phone / WhatsApp</label>
                  <input
                    type="tel"
                    className="form-input"
                    placeholder="+91 98200 12345"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Product Category</label>
                  <select
                    className="form-select"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="Vintage & Fashion">Vintage & Fashion</option>
                    <option value="Handicrafts & Decor">Handicrafts & Decor</option>
                    <option value="Gourmet Eats">Gourmet Eats & Food Kiosks</option>
                    <option value="Handmade Jewelry">Handmade Jewelry & Accessories</option>
                    <option value="Organic Beauty">Organic Skincare & Wellness</option>
                  </select>
                </div>
              </>
            )}

            <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '10px' }}>
              {isRegister ? "Create Account & Continue →" : "Login & Book Stall →"}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: 'var(--text-muted)' }}>
            {isRegister ? "Already have a vendor account? " : "New vendor wanting to exhibit? "}
            <button 
              style={{ background: 'none', border: 'none', color: 'var(--accent-amber)', fontWeight: '700', cursor: 'pointer' }}
              onClick={() => setIsRegister(!isRegister)}
            >
              {isRegister ? "Sign In Here" : "Register Brand"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VendorAuth;
