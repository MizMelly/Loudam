import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-[#173B6C] text-[#9CC4E4] pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">

          {/* Loudam Column */}
          <div className="space-y-4">
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
              <span className="text-xl font-bold tracking-wider text-white">
                LOUDAM
              </span>
            </div>

            <p className="text-sm leading-relaxed text-[#9CC4E4]">
              Trust infrastructure for digital commerce in Africa.
              Every consumer voice tracked, resolved, and transformed into accountability.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-white font-semibold mb-4">Platform</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-white transition">File a Complaint</a></li>
              <li><a href="#" className="hover:text-white transition">Track Complaints</a></li>
              <li><a href="#" className="hover:text-white transition">Brand Ratings</a></li>
              <li><a href="#" className="hover:text-white transition">For Businesses</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-white transition">About Us</a></li>
              <li><a href="#" className="hover:text-white transition">Blog</a></li>
              <li><a href="#" className="hover:text-white transition">Careers</a></li>
              <li><a href="#" className="hover:text-white transition">Contact</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition">Cookie Policy</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-16 pt-8 text-center text-sm text-[#9CC4E4]">
          © 2026 Loudam. All rights reserved. Building trust in African digital commerce.
        </div>
      </div>
    </footer>
  );
};

export default Footer;