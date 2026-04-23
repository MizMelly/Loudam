import React from "react";
import { useNavigate } from "react-router-dom";
import { FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-[#173B6C] text-[#9CC4E4] pt-12 md:pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Loudam Column */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 11L21 4V20L3 13V11Z"
                  stroke="#FF6F00"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-lg sm:text-xl font-bold tracking-wider text-white">
                LOUDAM
              </span>
            </div>

            <p className="text-sm leading-relaxed">
              Trust infrastructure for digital commerce in Africa.
              Every consumer voice tracked, resolved, and transformed into accountability.
            </p>

            {/* Social Media */}
            
            <div className="pt-3">
  <p className="text-white font-semibold mb-2">Follow Us</p>

  <div className="flex items-center gap-4 text-white text-lg">

    <a
      href="https://instagram.com/loudamnaija"
      target="_blank"
      rel="noreferrer"
      className="hover:text-pink-400 transition transform hover:scale-110"
    >
      <FaInstagram />
    </a>

    <a
      href="https://x.com/loudamnaija"
      target="_blank"
      rel="noreferrer"
      className="hover:text-gray-300 transition transform hover:scale-110"
    >
      <FaXTwitter />
    </a>

    <a
      href="https://facebook.com/loudamnaija"
      target="_blank"
      rel="noreferrer"
      className="hover:text-blue-400 transition transform hover:scale-110"
    >
      <FaFacebook />
    </a>

    <a
      href="https://linkedin.com/company/loudamnaija"
      target="_blank"
      rel="noreferrer"
      className="hover:text-blue-300 transition transform hover:scale-110"
    >
      <FaLinkedin />
    </a>

  </div>
</div>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-white font-semibold mb-4">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">File a Complaint</a></li>
              <li><a href="#" className="hover:text-white">Track Complaints</a></li>
              <li><a href="#" className="hover:text-white">Brand Ratings</a></li>
              <li><a href="#" className="hover:text-white">For Businesses</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Blog</a></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-6 text-center text-xs sm:text-sm">
          © 2026 Loudam. All rights reserved. Building trust in African digital commerce.
        </div>
      </div>
    </footer>
  );
};

export default Footer;