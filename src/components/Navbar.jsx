import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsOpen(false);
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/home');
    }
  };

  return (
    <nav className="bg-[#173B6C] text-white sticky top-0 z-50 border-b border-white/30">
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate(token ? '/dashboard' : '/')}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 11L21 4V20L3 13V11Z"
                stroke="#FF6F00"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>

            <span className="text-xl font-bold tracking-wider">
              LOUDAM
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 text-[15px] font-medium text-blue-200">

            {token ? (
              <>
                <button
                  onClick={() => navigate('/track-complaints')}
                  className="hover:text-white transition"
                >
                  Track Complaint
                </button>

                {/* ✅ FIXED: Now looks like normal link */}
                <button
                  onClick={() => navigate('/file-complaint')}
                  className="hover:text-white transition"
                >
                  File a Complaint
                </button>

                <button
                  onClick={handleLogout}
                  className="bg-orange-500 hover:bg-orange-600 px-5 py-2 rounded-xl font-semibold text-white transition text-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => scrollToSection('how-it-works')}
                  className="hover:text-white transition"
                >
                  How It Works
                </button>

                <button
                  onClick={() => scrollToSection('why-loudam')}
                  className="hover:text-white transition"
                >
                  For Businesses
                </button>

                <button
                  onClick={() => navigate('/brands')}
                  className="hover:text-white transition"
                >
                  Brands
                </button>

                <button
                  onClick={() => navigate('/login')}
                  className="hover:text-white transition"
                >
                  My Complaints
                </button>

                {/* Orange button only when logged out */}
                <button
                  onClick={() => navigate('/file-complaint')}
                  className="bg-orange-500 hover:bg-orange-600 px-5 py-2 rounded-lg font-semibold text-white transition text-sm"
                >
                  File a Complaint
                </button>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-2xl"
          >
            {isOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="flex flex-col gap-4 mt-4 md:hidden text-blue-200">

            {token ? (
              <>
                <button onClick={() => navigate('/track-complaints')}>
                  Track Complaint
                </button>

                {/* ✅ FIXED: Normal link on mobile too */}
                <button onClick={() => navigate('/file-complaint')}>
                  File a Complaint
                </button>

                <button
                  onClick={handleLogout}
                  className="border border-white px-4 py-2 rounded-xl hover:bg-white hover:text-[#173B6C] transition text-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button onClick={() => scrollToSection('how-it-works')}>
                  How It Works
                </button>

                <button onClick={() => scrollToSection('why-loudam')}>
                  For Businesses
                </button>

                <button onClick={() => navigate('/brands')}>
                  Brands
                </button>

                <button onClick={() => navigate('/login')}>
                  My Complaints
                </button>

                <button
                  onClick={() => navigate('/file-complaint')}
                  className="bg-orange-500 hover:bg-orange-600 px-5 py-2 rounded-lg font-semibold text-white transition text-sm"
                >
                  File a Complaint
                </button>
              </>
            )}
          </div>
        )}

      </div>
    </nav>
  );
};

export default Navbar;