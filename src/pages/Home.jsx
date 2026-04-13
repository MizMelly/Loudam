// src/pages/Home.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';    
import HowItworks from '../components/HowItworks';
import Whyloudam from '../components/Whyloudam';
import StatsBar from '../components/StatsBar';
import DataSection from '../components/DataSection';
import Footer from '../components/Footer';
import RecentComplaints from '../components/RecentComplaints';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />

      {/* Add IDs for smooth scroll */}
      <div id="how-it-works">
        <HowItworks />
      </div>

      <div id="why-loudam">
        <Whyloudam />
      </div>
      <RecentComplaints />

      {/* Optional sections without scroll */}
      <StatsBar />
     
        <DataSection />
       
      

      <Footer />
    </div>
  );
};

export default Home;