import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import AboutSection from "../components/AboutSection";
import ProgramsSection from "../components/ProgramsSection";
import ScheduleSection from "../components/ScheduleSection";
import GallerySection from "../components/GallerySection";
import TestimonialsSection from "../components/TestimonialsSection";
// import VideoGallery from "../components/VideoGallery";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import AdminLogin from "../components/AdminLogin";

const index = ({ user, onLogout, onLogin }) => {
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (userData) => {
    // Update user state in App.jsx
    onLogin(userData);
    setShowAdminLogin(false);
    // Navigate to admin panel
    navigate('/admin');
  };

  return (
    <>
      <Navbar onAdminClick={() => setShowAdminLogin(true)} user={user} onLogout={onLogout} />
      <Hero />
      <AboutSection />
      <ProgramsSection />
      <ScheduleSection />
      <GallerySection />
      {/* <VideoGallery /> */}
      <TestimonialsSection />
      <ContactSection />
      <Footer />

      {showAdminLogin && (
        <AdminLogin
          onLogin={handleLogin}
          onClose={() => setShowAdminLogin(false)}
        />
      )}
    </>
  );
};

export default index;
