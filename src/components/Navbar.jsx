import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { googleLogout } from "@react-oauth/google"; // ✅ ADD THIS

const Navbar = ({ setIsAuthenticated }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");

  const scrollToSection = (id) => {
    const isHome = location.pathname === "/" || location.pathname === "/home";

    const performScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    if (!isHome) {
      navigate("/home");
      setTimeout(() => performScroll(), 300);
    } else {
      performScroll();
    }

    setIsOpen(false);
  };

  // ✅ 🔥 FIXED LOGOUT FUNCTION
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      // Clear your app session
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // 🔥 VERY IMPORTANT: Clear Google session
      googleLogout();

      // Extra safety (prevents auto account selection)
      if (window.google?.accounts?.id) {
        window.google.accounts.id.disableAutoSelect();
      }

      // Update auth state if you're using it globally
      if (setIsAuthenticated) {
        setIsAuthenticated(false);
      }

      navigate("/login", { replace: true });
    }
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  return (
    <nav className="bg-[#173B6C] text-white sticky top-0 z-50 border-b border-white/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate(token ? "/dashboard" : "/")}
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
                <button onClick={() => navigate("/track-complaints")} className="hover:text-white transition">
                  Track Complaint
                </button>

                <button onClick={() => navigate("/file-complaint")} className="hover:text-white transition">
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
                <button onClick={() => scrollToSection("how-it-works")} className="hover:text-white transition">
                  How It Works
                </button>

                <button onClick={() => scrollToSection("why-loudam")} className="hover:text-white transition">
                  For Businesses
                </button>

                <button onClick={() => navigate("/brands")} className="hover:text-white transition">
                  Brands
                </button>

                <button onClick={() => navigate("/login")} className="hover:text-white transition">
                  My Complaints
                </button>

                <button
                  onClick={() => navigate("/file-complaint")}
                  className="bg-orange-500 hover:bg-orange-600 px-5 py-2 rounded-lg font-semibold text-white transition text-sm"
                >
                  File a Complaint
                </button>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setIsOpen(true)} className="md:hidden text-2xl">
            ☰
          </button>
        </div>
      </div>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Side Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[75%] bg-[#173B6C] z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-6 text-blue-200">

          <div className="flex justify-end mb-8">
            <button onClick={() => setIsOpen(false)} className="text-2xl text-white">
              ✕
            </button>
          </div>

          <div className="flex flex-col gap-6 text-lg">
            {token ? (
              <>
                <button onClick={() => { navigate("/track-complaints"); setIsOpen(false); }}>
                  Track Complaint
                </button>

                <button onClick={() => { navigate("/file-complaint"); setIsOpen(false); }}>
                  File a Complaint
                </button>

                <button onClick={handleLogout} className="mt-4 border border-white px-4 py-2 rounded-xl">
                  Logout
                </button>
              </>
            ) : (
              <>
                <button onClick={() => scrollToSection("how-it-works")}>
                  How It Works
                </button>

                <button onClick={() => scrollToSection("why-loudam")}>
                  For Businesses
                </button>

                <button onClick={() => { navigate("/brands"); setIsOpen(false); }}>
                  Brands
                </button>

                <button onClick={() => { navigate("/login"); setIsOpen(false); }}>
                  My Complaints
                </button>

                <button
                  onClick={() => { navigate("/file-complaint"); setIsOpen(false); }}
                  className="bg-orange-500 px-5 py-3 rounded-lg mt-4"
                >
                  File a Complaint
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;