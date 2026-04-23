import React from "react";
import { useNavigate } from "react-router-dom";
import HeroImage from "./../assets/hero.jpg";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-linear-to-b from-[#0E355F] via-[#123E6E] to-[#17487A] text-white pt-20 pb-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT */}
          <div className="space-y-6">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#1E4A78]/60 px-5 py-2 rounded-full text-sm text-[#8EC4E8] border border-[#2A5E90]">
              ✈ Trust Infrastructure for Digital Commerce
            </div>

            {/* Heading */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              <span>From Complaint to</span> <br />

              <span>
                Resolution—{" "}
                <span className="text-[#7EB4D2]">Loudam</span>
              </span>

              <br />

              <span className="text-[#BDA88D]">Makes It </span>
              <span className="text-[#FF7A00]">Happen.</span>
            </h1>

            {/* Description */}
            <p className="text-[#7FA6C9] text-lg max-w-xl">
              Track your complaints. Get real results. Hold brands <br/>accountable—
              with structure, data, and transparency.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">

              <button
                onClick={() => navigate("/file-complaint")}
                className="bg-linear-to-r from-[#FF7A00] to-[#FF8C1A] hover:brightness-110 text-white px-7 py-3 rounded-xl font-semibold transition shadow-xl"
              >
                File a Complaint →
              </button>

              <button className="border border-[#5FA8D3] text-[#7FC4E8] hover:bg-[#1A4A75]/40 px-7 py-3 rounded-xl font-semibold transition">
                For Businesses
              </button>

            </div>

            {/* Stats */}
            <div className="flex flex-row items-center justify-center lg:justify-start gap-6 sm:gap-8 pt-6 text-xs sm:text-sm text-[#7FA6C9] whitespace-nowrap">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                1,000+ Complaints Resolved
              </div>

              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#FF7A00] rounded-full"></span>
                500+ Brands Tracked
              </div>
            </div>

          </div>

          {/* RIGHT */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="bg-[#020B2D] rounded-[20px] shadow-[0_20px_80px_rgba(0,0,0,0.6)] overflow-hidden 
              w-full lg:w-130 xl:w-145 lg:-mt-16"
            >
              <img
                src={HeroImage}
                alt="Megaphone"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;