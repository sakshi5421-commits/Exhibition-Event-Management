import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ExhibitionContext } from "../context/ExhibitionContext";

function ProductDetails() {
  const navigate = useNavigate();
  const { 
    selectedExhibition, 
    selectedStallId, 
    vendorUser, 
    currentVendorApplication, 
    setCurrentVendorApplication 
  } = useContext(ExhibitionContext);

  const [details, setDetails] = useState({
    vendorName: vendorUser?.businessName || currentVendorApplication.vendorName || "",
    email: vendorUser?.email || currentVendorApplication.email || "",
    phone: vendorUser?.phone || "",
    productName: currentVendorApplication.productName || "",
    productCategory: currentVendorApplication.productCategory || "Vintage & Fashion",
    priceRange: "₹500 - ₹5,000",
    productDescription: currentVendorApplication.productDescription || "",
    powerRequired: false,
    tableCount: "1 Table, 2 Chairs",
    productImage: currentVendorApplication.productImage || "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop"
  });

  const handleNext = (e) => {
    e.preventDefault();
    if (!details.vendorName || !details.productName) {
      alert("Please fill in your Brand Name and Product Title.");
      return;
    }
    setCurrentVendorApplication({
      ...details,
      exhibitionId: selectedExhibition.id,
      exhibitionName: selectedExhibition.name,
      stallNumber: selectedStallId || "A1"
    });
    navigate("/application");
  };

  return (
    <div>
      <Navbar />

      <main className="auth-container">
        <div className="glass-card auth-card" style={{ maxWidth: '650px' }}>
          <div className="auth-header">
            <div className="market-badge" style={{ marginBottom: '12px' }}>
              <span>📦</span> STEP 2 OF 3: PRODUCT & STALL REQUIREMENTS
            </div>
            <h2>Product Details & Exhibition Requirements</h2>
            <p>Tell us about the products you will showcase at Stall {selectedStallId || 'A1'}</p>
          </div>

          <form onSubmit={handleNext}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label>Brand / Vendor Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Aura Vintage Store"
                  value={details.vendorName}
                  onChange={(e) => setDetails({ ...details, vendorName: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Contact Email</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="vendor@brand.com"
                  value={details.email}
                  onChange={(e) => setDetails({ ...details, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label>Main Product Title</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Hand-embroidered Boho Jackets"
                  value={details.productName}
                  onChange={(e) => setDetails({ ...details, productName: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Product Category</label>
                <select
                  className="form-select"
                  value={details.productCategory}
                  onChange={(e) => setDetails({ ...details, productCategory: e.target.value })}
                >
                  <option value="Vintage & Fashion">Vintage & Fashion</option>
                  <option value="Handicrafts & Decor">Handicrafts & Decor</option>
                  <option value="Gourmet Eats">Gourmet Eats & Food</option>
                  <option value="Handmade Jewelry">Handmade Jewelry</option>
                  <option value="Organic Beauty">Organic Skincare & Wellness</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Product Description & Unique Selling Points</label>
              <textarea
                className="form-textarea"
                placeholder="Describe materials, craftsmanship, price points, or eco-friendly features..."
                value={details.productDescription}
                onChange={(e) => setDetails({ ...details, productDescription: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Product Sample Image URL</label>
              <input
                type="text"
                className="form-input"
                placeholder="https://..."
                value={details.productImage}
                onChange={(e) => setDetails({ ...details, productImage: e.target.value })}
              />
            </div>

            <div style={{ padding: '16px', background: 'rgba(255,255,255,0.04)', borderRadius: '12px', border: '1px solid var(--border-color)', marginBottom: '24px' }}>
              <div style={{ fontWeight: '700', marginBottom: '12px', fontSize: '15px', color: 'var(--accent-amber)' }}>
                ⚡ Additional Stall Requirements
              </div>
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', fontSize: '14px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={details.powerRequired}
                    onChange={(e) => setDetails({ ...details, powerRequired: e.target.checked })}
                  />
                  <span>15A Electric Power Socket (for lights/heaters)</span>
                </label>
              </div>
            </div>

            <button type="submit" className="btn-neon" style={{ width: '100%' }}>
              Review Application & Confirm Stall →
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default ProductDetails;