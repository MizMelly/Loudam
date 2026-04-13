import React from "react";

const StatsBar = () => {
  return (
    <section className="bg-[#173B6C] py-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-16 text-center">

          {/* Stat 1 */}
          <div className="flex flex-col items-center">
            <h2 className="text-4xl md:text-5xl font-semibold text-[#D1BFA3] tracking-wide">
              1,000+
            </h2>
            <p className="mt-3 text-[#9CC4E4] text-sm md:text-base">
              Complaints Resolved
            </p>
          </div>

          {/* Stat 2 */}
          <div className="flex flex-col items-center">
            <h2 className="text-4xl md:text-5xl font-semibold text-[#D1BFA3] tracking-wide">
              500+
            </h2>
            <p className="mt-3 text-[#9CC4E4] text-sm md:text-base">
              Brands Tracked
            </p>
          </div>

          {/* Stat 3 */}
          <div className="flex flex-col items-center">
            <h2 className="text-4xl md:text-5xl font-semibold text-[#D1BFA3] tracking-wide">
              98%
            </h2>
            <p className="mt-3 text-[#9CC4E4] text-sm md:text-base">
              Response Rate
            </p>
          </div>

          {/* Stat 4 */}
          <div className="flex flex-col items-center">
            <h2 className="text-4xl md:text-5xl font-semibold text-[#D1BFA3] tracking-wide">
              48hrs
            </h2>
            <p className="mt-3 text-[#9CC4E4] text-sm md:text-base">
              Avg. Resolution Time
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default StatsBar;