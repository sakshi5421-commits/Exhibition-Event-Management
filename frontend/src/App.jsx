import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ExhibitionProvider } from "./context/ExhibitionContext";

import Home from "./pages/Home";
import MarketHub from "./pages/MarketHub";
import OrganizerLogin from "./pages/OrganizerLogin";
import OrganizerDashboard from "./pages/OrganizerDashboard";
import VendorAuth from "./pages/VendorAuth";
import BookStall from "./pages/BookStall";
import StallMap from "./pages/StallMap";
import ProductDetails from "./pages/ProductDetails";
import Application from "./pages/Application";
import Payment from "./pages/Payment";
import Exhibitions from "./pages/Exhibitions";
import VisitExhibition from "./pages/VisitExhibition";

function App() {
  return (
    <ExhibitionProvider>
      <BrowserRouter>
        <Routes>
          {/* Landing & Hub */}
          <Route path="/" element={<Home />} />
          <Route path="/hub" element={<MarketHub />} />

          {/* Option 1: Exhibition Organizer */}
          <Route path="/organizer/login" element={<OrganizerLogin />} />
          <Route path="/organizer/dashboard" element={<OrganizerDashboard />} />
          <Route path="/manager-login" element={<OrganizerLogin />} />
          <Route path="/manager" element={<OrganizerDashboard />} />

          {/* Option 2: Book a Stall (Vendors) */}
          <Route path="/vendor/login" element={<VendorAuth />} />
          <Route path="/login" element={<VendorAuth />} />
          <Route path="/register" element={<VendorAuth />} />
          <Route path="/bookstall" element={<BookStall />} />
          <Route path="/stallmap" element={<StallMap />} />
          <Route path="/productdetails" element={<ProductDetails />} />
          <Route path="/application" element={<Application />} />
          <Route path="/payment" element={<Payment />} />

          {/* Option 3: Explore Exhibition (Visitors) */}
          <Route path="/exhibitions" element={<Exhibitions />} />
          <Route path="/visit-exhibition/:id" element={<VisitExhibition />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ExhibitionProvider>
  );
}

export default App;