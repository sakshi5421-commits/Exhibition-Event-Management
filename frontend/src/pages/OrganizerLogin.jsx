import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ExhibitionContext } from "../context/ExhibitionContext";

function OrganizerLogin() {
  const navigate = useNavigate();
  const { setOrganizerUser } = useContext(ExhibitionContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    exhibitionName: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.exhibitionName) {
      alert("Please fill in all required organizer credentials.");
      return;
    }
    setOrganizerUser(formData);
    navigate("/organizer/dashboard");
  };

  return (
    <div>
      <Navbar />

      <div className="auth-container">
        <div className="glass-card auth-card">
          <div className="auth-header">
            <div style={{ fontSize: '42px', marginBottom: '10px' }}>🎪</div>
            <h2>Organizer Login</h2>
            <p>Access your Night Flea Market organizer portal</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Sakshi Verma"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>Email / Username</label>
              <input
                type="email"
                className="form-input"
                placeholder="organizer@nightmarket.com"
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

            <div className="form-group">
              <label>Exhibition Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Midnight Artisan Flea Market"
                value={formData.exhibitionName}
                onChange={(e) => setFormData({ ...formData, exhibitionName: e.target.value })}
                required
              />
            </div>

            <button type="submit" className="btn-neon" style={{ width: '100%', marginTop: '10px' }}>
              Enter Organizer Dashboard →
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default OrganizerLogin;
