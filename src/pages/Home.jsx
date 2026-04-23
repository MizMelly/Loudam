import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';    
import HowItWorks from '../components/HowItWorks';
import WhyLoudam from '../components/WhyLoudam';
import StatsBar from '../components/StatsBar';
import DataSection from '../components/DataSection';
import Footer from '../components/Footer';
import RecentComplaints from '../components/RecentComplaints';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />

      <div id="how-it-works">
        <HowItWorks />
      </div>

      <div id="why-loudam">
        <WhyLoudam />
      </div>

      <RecentComplaints />

      <StatsBar />
      <DataSection />

      <Footer />
    </div>
  );
};

export default Home;