import React from "react";

const DataSection = () => {
  return (
    <section className="bg-white py-24">
      <div className="max-w-5xl mx-auto px-6 text-center">

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-[#1F2A37] leading-tight">
          Your Voice, Backed by Data
        </h2>

        {/* Subtext */}
        <p className="mt-6 text-lg text-[#6B7C93] max-w-2xl mx-auto leading-relaxed">
          Join thousands of consumers holding brands accountable. 
          Track complaints, follow progress, and turn issues into real change.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center mt-12">

          <button className="bg-[#FF7A00] hover:bg-[#FF8C1A] transition text-white font-semibold px-10 py-4 rounded-xl text-lg flex items-center justify-center gap-2 shadow-md">
            Get Started →
          </button>

          <button className="border border-[#173B6C] text-[#173B6C] hover:bg-[#173B6C] hover:text-white transition font-semibold px-10 py-4 rounded-xl text-lg">
            Partner With Us
          </button>

        </div>

      </div>
    </section>
  );
};

export default DataSection;