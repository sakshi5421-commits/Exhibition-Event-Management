const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// In-Memory store fallback if MongoDB is not active
let mockExhibitions = [
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
    mapUrl: "https://maps.google.com",
    description: "Immerse yourself in Mumbai's glowing Night Flea Market! Over 50+ handpicked artisanal stalls, live acoustic music, neon photo booths, and gourmet street dining under warm string lights.",
    categories: ["Handicrafts & Decor", "Vintage & Fashion", "Gourmet Eats", "Handmade Jewelry", "Live Art"],
    halls: [
      { id: "h1", name: "Hall A: Starlight Bazaar", capacity: "20 Stalls", theme: "Artisanal & Vintage Fashion" },
      { id: "h2", name: "Hall B: Lantern Promenade", capacity: "15 Stalls", theme: "Handmade Crafts & Gifts" },
      { id: "h3", name: "Hall C: Neon Food Street", capacity: "15 Stalls", theme: "Gourmet Eats & Craft Drinks" }
    ],
    stalls: [
      { id: "A1", hall: "Hall A", price: 6500, size: "10x10 ft", status: "booked", vendor: "Aura Vintage Store", productCategory: "Vintage & Fashion" },
      { id: "A2", hall: "Hall A", price: 6500, size: "10x10 ft", status: "available", vendor: "", productCategory: "" },
      { id: "A3", hall: "Hall A", price: 7000, size: "12x10 ft Corner", status: "available", vendor: "", productCategory: "" },
      { id: "B1", hall: "Hall B", price: 5000, size: "8x8 ft", status: "booked", vendor: "Earth Clay Pottery", productCategory: "Handicrafts & Decor" },
      { id: "B2", hall: "Hall B", price: 5000, size: "8x8 ft", status: "available", vendor: "", productCategory: "" },
      { id: "C1", hall: "Hall C", price: 8000, size: "12x12 ft Food Kiosk", status: "booked", vendor: "Midnight Brews & Churros", productCategory: "Gourmet Eats" },
      { id: "C2", hall: "Hall C", price: 8000, size: "12x12 ft Food Kiosk", status: "available", vendor: "", productCategory: "" }
    ],
    products: [
      {
        id: "p1",
        stallId: "A1",
        vendorName: "Aura Vintage Store",
        title: "Hand-embroidered Bohemian Jacket",
        category: "Vintage & Fashion",
        price: "₹3,499",
        description: "Upcycled retro denim jacket with glowing thread artwork.",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop"
      },
      {
        id: "p2",
        stallId: "B1",
        vendorName: "Earth Clay Pottery",
        title: "Terracotta Lantern Oil Lamp",
        category: "Handicrafts & Decor",
        price: "₹899",
        description: "Hand-carved clay lantern emitting warm shadow patterns.",
        image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=600&auto=format&fit=crop"
      },
      {
        id: "p3",
        stallId: "C1",
        vendorName: "Midnight Brews & Churros",
        title: "Artisanal Dark Chocolate Churros",
        category: "Gourmet Eats",
        price: "₹299",
        description: "Crispy freshly fried churros dusted with cinnamon sugar and hot cocoa dip.",
        image: "https://images.unsplash.com/photo-1624371414361-e670edf4898d?w=600&auto=format&fit=crop"
      }
    ]
  },
  {
    id: "exhi-2",
    name: "Goregaon Moonlight Fair",
    tagline: "Under the Moonlit Canopy",
    organizerName: "Rohan Sharma",
    organizerEmail: "rohan@goregaonfair.in",
    venue: "Nesco Center, Hall 4",
    location: "Goregaon East, Mumbai",
    date: "2026-09-25",
    timing: "05:00 PM - 12:00 AM",
    mapUrl: "https://maps.google.com",
    description: "A magical night venue showcasing indie brands, acoustic bands, gourmet food trucks, and handmade crafts.",
    categories: ["Apparel", "Home Decor", "Organic Skincare", "Street Food"],
    halls: [
      { id: "h1", name: "Main Dome", capacity: "30 Stalls", theme: "Fashion & Lifestyle" },
      { id: "h2", name: "Garden Alley", capacity: "20 Stalls", theme: "Organic & Gourmet" }
    ],
    stalls: [
      { id: "M1", hall: "Main Dome", price: 6000, size: "10x10 ft", status: "available", vendor: "", productCategory: "" },
      { id: "M2", hall: "Main Dome", price: 6000, size: "10x10 ft", status: "available", vendor: "", productCategory: "" },
      { id: "G1", hall: "Garden Alley", price: 5500, size: "10x10 ft", status: "available", vendor: "", productCategory: "" }
    ],
    products: []
  }
];

let mockApplications = [
  {
    id: "app-1",
    exhibitionId: "exhi-1",
    exhibitionName: "Midnight Artisan Flea Market",
    applicantName: "Aura Vintage Store",
    email: "aura@vintage.com",
    phone: "+91 98200 12345",
    productName: "Bohemian Retro Apparel",
    productCategory: "Vintage & Fashion",
    productDescription: "Hand-picked vintage denim, silk scarves, and handcrafted jackets.",
    stallNumber: "A1",
    status: "Approved",
    paymentStatus: "Paid",
    createdAt: new Date().toISOString()
  }
];

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/exhibition")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection bypassed. Running with memory store."));

app.get("/", (req, res) => {
  res.send("Night Flea Market ExhiConnect Backend is active!");
});

// GET all exhibitions
app.get("/api/exhibitions", (req, res) => {
  res.json(mockExhibitions);
});

// GET single exhibition
app.get("/api/exhibitions/:id", (req, res) => {
  const exhi = mockExhibitions.find((e) => e.id === req.params.id);
  if (!exhi) return res.status(404).json({ error: "Exhibition not found" });
  res.json(exhi);
});

// CREATE / UPDATE exhibition
app.post("/api/exhibitions", (req, res) => {
  const newExhibition = {
    id: `exhi-${Date.now()}`,
    name: req.body.name || "Untitled Night Exhibition",
    tagline: req.body.tagline || "Night Flea Market Event",
    organizerName: req.body.organizerName || "Organizer",
    organizerEmail: req.body.organizerEmail || "organizer@market.com",
    venue: req.body.venue || "Exhibition Pavilion",
    location: req.body.location || "City Center",
    date: req.body.date || "2026-10-01",
    timing: req.body.timing || "06:00 PM - 01:00 AM",
    mapUrl: req.body.mapUrl || "https://maps.google.com",
    description: req.body.description || "Night market exhibition event",
    categories: req.body.categories || ["Handicrafts", "Fashion", "Gourmet Food"],
    halls: req.body.halls || [
      { id: "h1", name: "Hall A: Grand Plaza", capacity: "20 Stalls", theme: "General Exhibition" }
    ],
    stalls: req.body.stalls || [
      { id: "S1", hall: "Hall A", price: 5000, size: "10x10 ft", status: "available", vendor: "", productCategory: "" },
      { id: "S2", hall: "Hall A", price: 5000, size: "10x10 ft", status: "available", vendor: "", productCategory: "" }
    ],
    products: req.body.products || []
  };

  mockExhibitions.unshift(newExhibition);
  res.status(201).json({ message: "Exhibition created successfully!", exhibition: newExhibition });
});

// GET Applications
app.get("/api/applications", (req, res) => {
  res.json(mockApplications);
});

// POST Application (handles both /application and /api/application)
const handlePostApplication = (req, res) => {
  const newApp = {
    id: `app-${Date.now()}`,
    exhibitionId: req.body.exhibitionId || "exhi-1",
    exhibitionName: req.body.exhibitionName || "Midnight Artisan Flea Market",
    applicantName: req.body.name || req.body.applicantName || "Vendor",
    email: req.body.email || "vendor@market.com",
    productName: req.body.product || req.body.productName || "Handmade Product",
    productCategory: req.body.productCategory || "Crafts",
    productDescription: req.body.productDescription || "",
    stallNumber: req.body.stall || req.body.stallNumber || "A1",
    status: req.body.status || "Pending",
    paymentStatus: "Unpaid",
    createdAt: new Date().toISOString()
  };

  mockApplications.unshift(newApp);
  res.status(201).json({ message: "Application saved successfully!", application: newApp });
};

app.post("/application", handlePostApplication);
app.post("/api/application", handlePostApplication);
app.post("/api/applications", handlePostApplication);

// UPDATE Application Status
app.patch("/api/applications/:id", (req, res) => {
  const appItem = mockApplications.find((a) => a.id === req.params.id);
  if (appItem) {
    if (req.body.status) appItem.status = req.body.status;
    if (req.body.paymentStatus) appItem.paymentStatus = req.body.paymentStatus;
    res.json({ message: "Application status updated", application: appItem });
  } else {
    res.status(404).json({ error: "Application not found" });
  }
});

module.exports = app;

if (process.env.NODE_ENV !== "production" || require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`ExhiConnect Night Market Server running on port ${PORT}`);
  });
}