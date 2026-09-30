import React, { createContext, useState, useEffect } from "react";

export const ExhibitionContext = createContext();

const INITIAL_EXHIBITIONS = [
  {
    id: "exhi-1",
    name: "Midnight Artisan Flea Market",
    tagline: "Under the Lantern Stars - Food, Music & Vintage Goods",
    organizerName: "Sakshi Verma",
    organizerEmail: "organizer@nightmarket.com",
    venue: "Starlight Grounds, West Pavilion",
    location: "Bandra Reclamation, Mumbai",
    date: "2026-09-15",
    timing: "06:00 PM - 01:30 AM (Night Market)",
    mapUrl: "https://maps.google.com/?q=Bandra+Reclamation+Mumbai",
    description: "Immerse yourself in Mumbai's premier Night Flea Market! Experience over 50+ handpicked artisanal stalls, live acoustic indie sets, fairy-lit pathways, glowing photo installations, and artisanal street dining under open skies.",
    categories: ["Handicrafts & Decor", "Vintage & Fashion", "Gourmet Eats", "Handmade Jewelry", "Live Art & Accessories"],
    halls: [
      { id: "h1", name: "Hall A: Starlight Bazaar", capacity: "20 Stalls", theme: "Artisanal & Vintage Fashion" },
      { id: "h2", name: "Hall B: Lantern Promenade", capacity: "15 Stalls", theme: "Handmade Crafts & Gifts" },
      { id: "h3", name: "Hall C: Neon Food Street", capacity: "15 Stalls", theme: "Gourmet Eats & Craft Beverages" }
    ],
    stalls: [
      { id: "A1", hall: "Hall A", price: 6500, size: "10x10 ft", status: "booked", vendor: "Aura Vintage Store", productCategory: "Vintage & Fashion" },
      { id: "A2", hall: "Hall A", price: 6500, size: "10x10 ft", status: "available", vendor: "", productCategory: "" },
      { id: "A3", hall: "Hall A", price: 7500, size: "12x10 ft Corner", status: "available", vendor: "", productCategory: "" },
      { id: "B1", hall: "Hall B", price: 5000, size: "8x8 ft", status: "booked", vendor: "Earth Clay Pottery", productCategory: "Handicrafts & Decor" },
      { id: "B2", hall: "Hall B", price: 5000, size: "8x8 ft", status: "available", vendor: "", productCategory: "" },
      { id: "B3", hall: "Hall B", price: 5500, size: "10x8 ft", status: "available", vendor: "", productCategory: "" },
      { id: "C1", hall: "Hall C", price: 8500, size: "12x12 ft Food Kiosk", status: "booked", vendor: "Midnight Brews & Churros", productCategory: "Gourmet Eats" },
      { id: "C2", hall: "Hall C", price: 8500, size: "12x12 ft Food Kiosk", status: "available", vendor: "", productCategory: "" }
    ],
    products: [
      {
        id: "p1",
        stallId: "A1",
        vendorName: "Aura Vintage Store",
        title: "Hand-embroidered Bohemian Jacket",
        category: "Vintage & Fashion",
        price: "₹3,499",
        description: "Upcycled retro denim jacket with hand-embroidered glowing thread artwork.",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop"
      },
      {
        id: "p2",
        stallId: "B1",
        vendorName: "Earth Clay Pottery",
        title: "Terracotta Lantern Oil Lamp",
        category: "Handicrafts & Decor",
        price: "₹899",
        description: "Hand-carved clay lantern emitting warm shadow patterns under night skies.",
        image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=600&auto=format&fit=crop"
      },
      {
        id: "p3",
        stallId: "C1",
        vendorName: "Midnight Brews & Churros",
        title: "Artisanal Dark Chocolate Churros",
        category: "Gourmet Eats",
        price: "₹299",
        description: "Crispy freshly fried churros dusted with cinnamon sugar and Belgian chocolate dip.",
        image: "https://images.unsplash.com/photo-1624371414361-e670edf4898d?w=600&auto=format&fit=crop"
      },
      {
        id: "p4",
        stallId: "A1",
        vendorName: "Aura Vintage Store",
        title: "70s Leather Crossbody Bag",
        category: "Vintage & Fashion",
        price: "₹1,850",
        description: "Genuine distressed brown leather bag with retro brass buckles.",
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&auto=format&fit=crop"
      }
    ]
  },
  {
    id: "exhi-2",
    name: "Goregaon Moonlight Fair",
    tagline: "Under the Moonlit Canopy",
    organizerName: "Rohan Sharma",
    organizerEmail: "rohan@goregaonfair.in",
    venue: "Nesco Center, Courtyard Lawn 4",
    location: "Goregaon East, Mumbai",
    date: "2026-09-25",
    timing: "05:00 PM - 12:00 AM",
    mapUrl: "https://maps.google.com/?q=Nesco+Goregaon+Mumbai",
    description: "A fairy-tale night festival bringing together independent fashion labels, handcrafted jewelry makers, acoustic indie bands, and artisanal food pop-ups.",
    categories: ["Apparel", "Home Decor", "Organic Skincare", "Street Food", "Live Caricature"],
    halls: [
      { id: "h1", name: "Dome A: Moonlight Fashion", capacity: "25 Stalls", theme: "Clothing & Accessories" },
      { id: "h2", name: "Courtyard B: Lantern Village", capacity: "20 Stalls", theme: "Organic Crafts & Home Decor" }
    ],
    stalls: [
      { id: "M1", hall: "Dome A", price: 6000, size: "10x10 ft", status: "booked", vendor: "Glow Candle Co.", productCategory: "Home Decor" },
      { id: "M2", hall: "Dome A", price: 6000, size: "10x10 ft", status: "available", vendor: "", productCategory: "" },
      { id: "G1", hall: "Courtyard B", price: 5500, size: "10x10 ft", status: "available", vendor: "", productCategory: "" }
    ],
    products: [
      {
        id: "p5",
        stallId: "M1",
        vendorName: "Glow Candle Co.",
        title: "Lavender Midnight Soy Candle",
        category: "Home Decor",
        price: "₹650",
        description: "100% soy wax hand-poured candle with soothing essential oils.",
        image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600&auto=format&fit=crop"
      }
    ]
  }
];

const INITIAL_APPLICATIONS = [
  {
    id: "app-101",
    exhibitionId: "exhi-1",
    exhibitionName: "Midnight Artisan Flea Market",
    applicantName: "Sakshi Vintage Collections",
    email: "sakshi@vintage.com",
    phone: "+91 98200 98765",
    productName: "Handmade Leather & Silver Jewelry",
    productCategory: "Handmade Jewelry",
    productDescription: "Custom handcrafted sterling silver rings and braided leather bracelets.",
    stallNumber: "A2",
    status: "Pending",
    paymentStatus: "Unpaid",
    createdAt: new Date().toISOString()
  }
];

const API_BASE = import.meta.env.VITE_API_URL || "";

export const ExhibitionProvider = ({ children }) => {
  const [exhibitions, setExhibitions] = useState(() => {
    const saved = localStorage.getItem("exhi_market_data");
    return saved ? JSON.parse(saved) : INITIAL_EXHIBITIONS;
  });

  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem("exhi_applications_data");
    return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
  });

  const [selectedExhibitionId, setSelectedExhibitionId] = useState("exhi-1");
  const [selectedStallId, setSelectedStallId] = useState(null);
  const [currentVendorApplication, setCurrentVendorApplication] = useState({
    productName: "",
    productCategory: "Vintage & Fashion",
    productDescription: "",
    priceRange: "₹500 - ₹5,000",
    productImage: ""
  });

  const [organizerUser, setOrganizerUser] = useState(null);
  const [vendorUser, setVendorUser] = useState(null);

  useEffect(() => {
    localStorage.setItem("exhi_market_data", JSON.stringify(exhibitions));
  }, [exhibitions]);

  useEffect(() => {
    localStorage.setItem("exhi_applications_data", JSON.stringify(applications));
  }, [applications]);

  // Sync with backend if server is up
  useEffect(() => {
    fetch(`${API_BASE}/api/exhibitions`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setExhibitions(data);
        }
      })
      .catch(() => {
        // Backend offline, fallback to LocalStorage/State
      });
  }, []);

  const addExhibition = (newExhi) => {
    const created = {
      ...newExhi,
      id: `exhi-${Date.now()}`,
      products: newExhi.products || [],
      stalls: newExhi.stalls || [
        { id: "A1", hall: "Hall A", price: 6000, size: "10x10 ft", status: "available", vendor: "", productCategory: "" },
        { id: "A2", hall: "Hall A", price: 6000, size: "10x10 ft", status: "available", vendor: "", productCategory: "" },
        { id: "B1", hall: "Hall B", price: 5000, size: "8x8 ft", status: "available", vendor: "", productCategory: "" },
        { id: "B2", hall: "Hall B", price: 5000, size: "8x8 ft", status: "available", vendor: "", productCategory: "" }
      ],
      halls: newExhi.halls || [
        { id: "h1", name: "Hall A: Main Promenade", capacity: "15 Stalls", theme: "General Artisanal" },
        { id: "h2", name: "Hall B: Night Bazaar", capacity: "15 Stalls", theme: "Food & Crafts" }
      ]
    };
    setExhibitions((prev) => [created, ...prev]);
    return created;
  };

  const updateExhibition = (id, updatedFields) => {
    setExhibitions((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...updatedFields } : e))
    );
  };

  const submitStallApplication = (appData) => {
    const newApp = {
      id: `app-${Date.now()}`,
      ...appData,
      status: "Pending",
      paymentStatus: "Unpaid",
      createdAt: new Date().toISOString()
    };

    setApplications((prev) => [newApp, ...prev]);

    // Send to server as well
    fetch(`${API_BASE}/api/application`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newApp)
    }).catch(() => {});

    return newApp;
  };

  const updateApplicationStatus = (appId, status) => {
    setApplications((prev) =>
      prev.map((a) => {
        if (a.id === appId) {
          const updated = { ...a, status };
          // If approved, update stall in exhibition
          if (status === "Approved") {
            setExhibitions((exList) =>
              exList.map((ex) => {
                if (ex.id === a.exhibitionId) {
                  return {
                    ...ex,
                    stalls: ex.stalls.map((s) =>
                      s.id === a.stallNumber
                        ? { ...s, status: "booked", vendor: a.applicantName, productCategory: a.productCategory }
                        : s
                    ),
                    products: [
                      ...ex.products,
                      {
                        id: `p-${Date.now()}`,
                        stallId: a.stallNumber,
                        vendorName: a.applicantName,
                        title: a.productName,
                        category: a.productCategory,
                        price: "₹1,500 - ₹5,000",
                        description: a.productDescription || "Artisanal quality products",
                        image: a.productImage || "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop"
                      }
                    ]
                  };
                }
                return ex;
              })
            );
          }
          return updated;
        }
        return a;
      })
    );

    // Call server
    fetch(`${API_BASE}/api/applications/${appId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    }).catch(() => {});
  };

  const selectedExhibition = exhibitions.find((e) => e.id === selectedExhibitionId) || exhibitions[0];

  return (
    <ExhibitionContext.Provider
      value={{
        exhibitions,
        selectedExhibition,
        selectedExhibitionId,
        setSelectedExhibitionId,
        selectedStallId,
        setSelectedStallId,
        currentVendorApplication,
        setCurrentVendorApplication,
        applications,
        addExhibition,
        updateExhibition,
        submitStallApplication,
        updateApplicationStatus,
        organizerUser,
        setOrganizerUser,
        vendorUser,
        setVendorUser
      }}
    >
      {children}
    </ExhibitionContext.Provider>
  );
};
