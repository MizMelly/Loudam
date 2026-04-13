import React from "react";
import { FileText, Search, CheckCircle, ArrowRight } from "lucide-react";

const HowItWorks = () => {
  return (
    <section className="py-24 bg-[#F3F6F9]">
      <div className="max-w-7xl mx-auto px-6 text-center">

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl font-bold text-[#1F2A37]">
          How Loudam Works
        </h2>

        <p className="mt-4 text-lg text-[#6B7C93]">
          A structured, transparent process from complaint to resolution.
        </p>

        {/* Cards */}
        <div className="mt-16 grid md:grid-cols-3 gap-8 relative items-center">

          {/* STEP 1 */}
          <div className="relative bg-[#F8FAFC] rounded-2xl p-8 text-left shadow-sm border border-gray-200">

            <span className="absolute top-6 right-6 text-[80px] font-bold text-[#D6E3EE]">
              01
            </span>

            <div className="w-14 h-14 flex items-center justify-center rounded-xl mb-6 bg-[#173B6C] text-white">
              <FileText size={26} />
            </div>

            <h3 className="text-xl font-semibold mb-3 text-[#1F2A37]">
              Submit Your Complaint
            </h3>

            <p className="leading-relaxed text-[#5B6B7F]">
              File a structured complaint against any brand. Your voice is recorded, tracked, and visible.
            </p>

            {/* Arrow */}
            <div className="hidden md:block absolute -right-7.5 top-1/2 transform -translate-y-1/2 text-[#7AAED6]">
              <ArrowRight size={28} />
            </div>
          </div>

          {/* STEP 2 */}
          <div className="relative bg-[#F8FAFC] rounded-2xl p-8 text-left shadow-sm border border-gray-200">

            <span className="absolute top-6 right-6 text-[80px] font-bold text-[#D6E3EE]">
              02
            </span>

            <div className="w-14 h-14 flex items-center justify-center rounded-xl mb-6 bg-[#173B6C] text-white">
              <Search size={26} />
            </div>

            <h3 className="text-xl font-semibold mb-3 text-[#1F2A37]">
              Track & Monitor
            </h3>

            <p className="leading-relaxed text-[#5B6B7F]">
              Follow your complaint in real-time. See status updates from submitted to resolved.
            </p>

            {/* Arrow */}
            <div className="hidden md:block absolute -right-7.5 top-1/2 transform -translate-y-1/2 text-[#7AAED6]">
              <ArrowRight size={28} />
            </div>
          </div>

          {/* STEP 3 */}
          <div className="relative bg-[#F8FAFC] rounded-2xl p-8 text-left shadow-sm border border-gray-200">

            <span className="absolute top-6 right-6 text-[80px] font-bold text-[#D6E3EE]">
              03
            </span>

            <div className="w-14 h-14 flex items-center justify-center rounded-xl mb-6 bg-[#173B6C] text-white">
              <CheckCircle size={26} />
            </div>

            <h3 className="text-xl font-semibold mb-3 text-[#1F2A37]">
              Get Resolution
            </h3>

            <p className="leading-relaxed text-[#5B6B7F]">
              Brands respond, regulators are informed, and your complaint drives real accountability.
            </p>

          </div>

        </div>
      </div>
    </section>
  );
};

export default HowItWorks;