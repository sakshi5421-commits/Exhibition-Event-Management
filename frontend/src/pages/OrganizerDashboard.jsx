import React, { useState, useContext } from "react";
import Navbar from "../components/Navbar";
import { ExhibitionContext } from "../context/ExhibitionContext";

function OrganizerDashboard() {
  const { 
    exhibitions, 
    selectedExhibition, 
    setSelectedExhibitionId, 
    addExhibition, 
    updateExhibition,
    applications,
    updateApplicationStatus,
    organizerUser
  } = useContext(ExhibitionContext);

  const [activeTab, setActiveTab] = useState("manage"); // 'manage' | 'applications' | 'create'

  // Form state for managing current exhibition details
  const [exhiDetails, setExhiDetails] = useState({
    name: selectedExhibition.name || "",
    tagline: selectedExhibition.tagline || "",
    venue: selectedExhibition.venue || "",
    location: selectedExhibition.location || "",
    date: selectedExhibition.date || "",
    timing: selectedExhibition.timing || "",
    mapUrl: selectedExhibition.mapUrl || "",
    description: selectedExhibition.description || "",
    categoriesText: (selectedExhibition.categories || []).join(", "),
    hallAName: selectedExhibition.halls?.[0]?.name || "Hall A: Main Plaza",
    hallBName: selectedExhibition.halls?.[1]?.name || "Hall B: Night Market Alley",
    stallCount: selectedExhibition.stalls?.length || 10,
    stallPriceBase: selectedExhibition.stalls?.[0]?.price || 5000
  });

  const [successMsg, setSuccessMsg] = useState("");

  const handleUpdateExhibition = (e) => {
    e.preventDefault();
    const updated = {
      name: exhiDetails.name,
      tagline: exhiDetails.tagline,
      venue: exhiDetails.venue,
      location: exhiDetails.location,
      date: exhiDetails.date,
      timing: exhiDetails.timing,
      mapUrl: exhiDetails.mapUrl,
      description: exhiDetails.description,
      categories: exhiDetails.categoriesText.split(",").map(s => s.trim()).filter(Boolean)
    };

    updateExhibition(selectedExhibition.id, updated);
    setSuccessMsg("✨ Exhibition details successfully updated!");
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  const handleCreateNewExhibition = (e) => {
    e.preventDefault();
    const created = addExhibition({
      name: exhiDetails.name || "New Night Flea Market",
      tagline: exhiDetails.tagline || "Night Market Festival",
      organizerName: organizerUser?.name || "Organizer",
      organizerEmail: organizerUser?.email || "organizer@market.com",
      venue: exhiDetails.venue || "Convention Grounds",
      location: exhiDetails.location || "Mumbai",
      date: exhiDetails.date || "2026-10-10",
      timing: exhiDetails.timing || "06:00 PM - 01:00 AM",
      mapUrl: exhiDetails.mapUrl || "https://maps.google.com",
      description: exhiDetails.description || "Exciting night market exhibition.",
      categories: exhiDetails.categoriesText.split(",").map(s => s.trim()).filter(Boolean)
    });
    setSelectedExhibitionId(created.id);
    setSuccessMsg("🎉 New Exhibition successfully created and active!");
    setActiveTab("manage");
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  return (
    <div>
      <Navbar />

      <main className="dashboard-layout">
        {/* DASHBOARD HEADER */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', marginBottom: '30px' }}>
          <div>
            <div className="market-badge">
              <span>🎪</span> ORGANIZER PORTAL
            </div>
            <h1 style={{ fontSize: '36px', marginTop: '8px' }}>
              Exhibition Management Dashboard
            </h1>
            <p style={{ color: 'var(--text-muted)' }}>
              Logged in as: <strong style={{ color: 'var(--accent-amber)' }}>{organizerUser?.name || "Sakshi Verma"}</strong> ({organizerUser?.email || "organizer@nightmarket.com"})
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button 
              className={activeTab === 'manage' ? 'btn-primary' : 'btn-outline'}
              onClick={() => setActiveTab('manage')}
            >
              ⚙️ Manage Details
            </button>
            <button 
              className={activeTab === 'applications' ? 'btn-primary' : 'btn-outline'}
              onClick={() => setActiveTab('applications')}
            >
              📋 Vendor Applications ({applications.length})
            </button>
            <button 
              className={activeTab === 'create' ? 'btn-neon' : 'btn-outline'}
              onClick={() => setActiveTab('create')}
            >
              ➕ Create Exhibition
            </button>
          </div>
        </div>

        {/* EXHIBITION SELECTOR DROPDOWN */}
        <div className="glass-card" style={{ padding: '20px', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <label style={{ fontWeight: '700', fontSize: '15px' }}>Select Active Exhibition to Manage:</label>
          <select 
            className="form-select" 
            style={{ width: '320px' }}
            value={selectedExhibition.id}
            onChange={(e) => {
              setSelectedExhibitionId(e.target.value);
              const found = exhibitions.find(ex => ex.id === e.target.value);
              if (found) {
                setExhiDetails({
                  name: found.name || "",
                  tagline: found.tagline || "",
                  venue: found.venue || "",
                  location: found.location || "",
                  date: found.date || "",
                  timing: found.timing || "",
                  mapUrl: found.mapUrl || "",
                  description: found.description || "",
                  categoriesText: (found.categories || []).join(", "),
                  hallAName: found.halls?.[0]?.name || "Hall A",
                  hallBName: found.halls?.[1]?.name || "Hall B",
                  stallCount: found.stalls?.length || 10,
                  stallPriceBase: found.stalls?.[0]?.price || 5000
                });
              }
            }}
          >
            {exhibitions.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name} — ({e.date})
              </option>
            ))}
          </select>
        </div>

        {successMsg && (
          <div className="glass-card" style={{ padding: '16px 24px', marginBottom: '24px', borderColor: 'var(--accent-green)', background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', fontWeight: '600' }}>
            {successMsg}
          </div>
        )}

        {/* TAB 1: MANAGE EXHIBITION DETAILS */}
        {activeTab === 'manage' && (
          <div className="dashboard-grid">
            {/* LEFT FORM */}
            <div className="glass-card" style={{ padding: '32px' }}>
              <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>
                ✏️ Edit Exhibition Details
              </h2>

              <form onSubmit={handleUpdateExhibition}>
                <div className="form-group">
                  <label>Exhibition Name</label>
                  <input 
                    type="text" 
                    className="form-input"
                    value={exhiDetails.name}
                    onChange={(e) => setExhiDetails({...exhiDetails, name: e.target.value})}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Tagline / Theme Badge</label>
                  <input 
                    type="text" 
                    className="form-input"
                    value={exhiDetails.tagline}
                    onChange={(e) => setExhiDetails({...exhiDetails, tagline: e.target.value})}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group">
                    <label>Venue Name</label>
                    <input 
                      type="text" 
                      className="form-input"
                      value={exhiDetails.venue}
                      onChange={(e) => setExhiDetails({...exhiDetails, venue: e.target.value})}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Location / City</label>
                    <input 
                      type="text" 
                      className="form-input"
                      value={exhiDetails.location}
                      onChange={(e) => setExhiDetails({...exhiDetails, location: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group">
                    <label>Date</label>
                    <input 
                      type="date" 
                      className="form-input"
                      value={exhiDetails.date}
                      onChange={(e) => setExhiDetails({...exhiDetails, date: e.target.value})}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Timing (Night Market Hours)</label>
                    <input 
                      type="text" 
                      className="form-input"
                      placeholder="e.g. 06:00 PM - 01:30 AM"
                      value={exhiDetails.timing}
                      onChange={(e) => setExhiDetails({...exhiDetails, timing: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Map / Location Mapping URL</label>
                  <input 
                    type="text" 
                    className="form-input"
                    placeholder="Google Maps link or venue mapping"
                    value={exhiDetails.mapUrl}
                    onChange={(e) => setExhiDetails({...exhiDetails, mapUrl: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label>Product Categories Allowed (comma separated)</label>
                  <input 
                    type="text" 
                    className="form-input"
                    value={exhiDetails.categoriesText}
                    onChange={(e) => setExhiDetails({...exhiDetails, categoriesText: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label>Exhibition Description & Visitor Guide</label>
                  <textarea 
                    className="form-textarea"
                    value={exhiDetails.description}
                    onChange={(e) => setExhiDetails({...exhiDetails, description: e.target.value})}
                  />
                </div>

                <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                  Save Exhibition Changes 💾
                </button>
              </form>
            </div>

            {/* RIGHT SIDE: HALL & STALL SPECIFICATIONS PREVIEW */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="glass-card" style={{ padding: '32px' }}>
                <h3 style={{ fontSize: '20px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  🏛️ Hall & Zone Details
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {(selectedExhibition.halls || []).map((h, idx) => (
                    <div key={h.id || idx} style={{ padding: '14px', background: 'rgba(255,255,255,0.04)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                      <div style={{ fontWeight: '700', color: 'var(--accent-amber)', fontSize: '16px' }}>{h.name}</div>
                      <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>Theme: {h.theme} | Capacity: {h.capacity}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card" style={{ padding: '32px' }}>
                <h3 style={{ fontSize: '20px', marginBottom: '16px' }}>
                  🏪 Stall Details & Occupancy
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat( auto-fit, minmax(120px, 1fr) )', gap: '12px' }}>
                  {(selectedExhibition.stalls || []).map((s) => (
                    <div 
                      key={s.id}
                      style={{
                        padding: '12px',
                        borderRadius: '10px',
                        textAlign: 'center',
                        background: s.status === 'booked' ? 'rgba(255,255,255,0.05)' : 'rgba(16, 185, 129, 0.1)',
                        border: `1px solid ${s.status === 'booked' ? 'var(--border-color)' : 'var(--accent-green)'}`
                      }}
                    >
                      <div style={{ fontWeight: '800' }}>Stall {s.id}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{s.hall}</div>
                      <div style={{ fontSize: '12px', color: 'var(--accent-amber)', fontWeight: '700', marginTop: '4px' }}>₹{s.price}</div>
                      <div style={{ fontSize: '11px', marginTop: '4px', textTransform: 'capitalize', color: s.status === 'booked' ? '#ef4444' : '#34d399' }}>
                        {s.status === 'booked' ? `Booked (${s.vendor || 'Vendor'})` : 'Available'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: REVIEW VENDOR APPLICATIONS */}
        {activeTab === 'applications' && (
          <div className="glass-card" style={{ padding: '32px' }}>
            <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>
              📋 Stall Booking Applications ({applications.length})
            </h2>

            {applications.length === 0 ? (
              <p style={{ color: 'var(--text-muted)' }}>No applications submitted yet.</p>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '14px' }}>
                      <th style={{ padding: '12px' }}>Applicant</th>
                      <th style={{ padding: '12px' }}>Exhibition</th>
                      <th style={{ padding: '12px' }}>Stall</th>
                      <th style={{ padding: '12px' }}>Product</th>
                      <th style={{ padding: '12px' }}>Status</th>
                      <th style={{ padding: '12px' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map((app) => (
                      <tr key={app.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={{ padding: '14px' }}>
                          <div style={{ fontWeight: '700' }}>{app.applicantName}</div>
                          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{app.email}</div>
                        </td>
                        <td style={{ padding: '14px' }}>{app.exhibitionName}</td>
                        <td style={{ padding: '14px', fontWeight: '800', color: 'var(--accent-amber)' }}>Stall {app.stallNumber}</td>
                        <td style={{ padding: '14px' }}>
                          <div style={{ fontWeight: '600' }}>{app.productName}</div>
                          <div style={{ fontSize: '12px', color: 'var(--accent-cyan)' }}>{app.productCategory}</div>
                        </td>
                        <td style={{ padding: '14px' }}>
                          <span className={`badge badge-${app.status.toLowerCase()}`}>
                            {app.status}
                          </span>
                        </td>
                        <td style={{ padding: '14px' }}>
                          {app.status === 'Pending' ? (
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <button 
                                className="btn-primary" 
                                style={{ padding: '6px 14px', fontSize: '13px' }}
                                onClick={() => updateApplicationStatus(app.id, 'Approved')}
                              >
                                ✓ Approve
                              </button>
                              <button 
                                className="btn-outline" 
                                style={{ padding: '6px 14px', fontSize: '13px', borderColor: '#ef4444', color: '#ef4444' }}
                                onClick={() => updateApplicationStatus(app.id, 'Rejected')}
                              >
                                ✕ Reject
                              </button>
                            </div>
                          ) : (
                            <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Decision Recorded</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: CREATE NEW EXHIBITION */}
        {activeTab === 'create' && (
          <div className="glass-card" style={{ padding: '32px', maxWidth: '700px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '26px', marginBottom: '16px' }}>
              ✨ Launch New Night Flea Market
            </h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
              Fill in venue, timing, and hall information to open stall bookings for vendors.
            </p>

            <form onSubmit={handleCreateNewExhibition}>
              <div className="form-group">
                <label>Exhibition Name</label>
                <input 
                  type="text" 
                  className="form-input"
                  placeholder="e.g. Midnight Artisan Carnival"
                  onChange={(e) => setExhiDetails({...exhiDetails, name: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>Venue Name</label>
                <input 
                  type="text" 
                  className="form-input"
                  placeholder="e.g. JVPD Grounds, Juhu"
                  onChange={(e) => setExhiDetails({...exhiDetails, venue: e.target.value})}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label>Date</label>
                  <input 
                    type="date" 
                    className="form-input"
                    onChange={(e) => setExhiDetails({...exhiDetails, date: e.target.value})}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Timing (Night Market)</label>
                  <input 
                    type="text" 
                    className="form-input"
                    placeholder="06:00 PM - 01:00 AM"
                    onChange={(e) => setExhiDetails({...exhiDetails, timing: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Location (City / Area)</label>
                <input 
                  type="text" 
                  className="form-input"
                  placeholder="Juhu, Mumbai"
                  onChange={(e) => setExhiDetails({...exhiDetails, location: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>Allowed Product Categories</label>
                <input 
                  type="text" 
                  className="form-input"
                  placeholder="Apparel, Handicrafts, Organic Beauty, Food"
                  onChange={(e) => setExhiDetails({...exhiDetails, categoriesText: e.target.value})}
                />
              </div>

              <button type="submit" className="btn-neon" style={{ width: '100%', marginTop: '10px' }}>
                Create Exhibition & Enable Stall Bookings 🚀
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}

export default OrganizerDashboard;
