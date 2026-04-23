import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const brandsData = [
  { name: "First Bank", a: 30, b: 25 },
  { name: "Airtel", a: 65, b: 45 },
  { name: "DSTV", a: 22, b: 35 },
  { name: "IBEDC", a: 10, b: 18 },
  { name: "Bolt", a: 55, b: 40 },
  { name: "Access", a: 59, b: 50 },
  { name: "MTN", a: 33, b: 28 },
  { name: "Air Peace", a: 48, b: 38 },
];

const max = 100;

const Brands = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <div className="flex-1 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">

          {/* TITLE */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-900">
              Brand Analytics Dashboard
            </h1>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">
              Accountability scores based on resolution speed and volume.
            </p>
          </div>

          {/* CARD */}
          <div className="bg-white rounded-3xl p-5 sm:p-10 border border-gray-100">

            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-8">
              Performance Overview
            </h2>

            {/* CHART */}
            <div className="relative h-90">

              {/* GRID */}
              <div className="absolute inset-0 flex flex-col justify-between opacity-20">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="border-t border-gray-400" />
                ))}
              </div>

              {/* Y AXIS */}
              <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 pr-2">
                <span>100</span>
                <span>75</span>
                <span>50</span>
                <span>25</span>
                <span>0</span>
              </div>

              {/* SCROLL WRAPPER (MOBILE FIX) */}
              <div className="ml-8 overflow-x-auto h-full">
                <div className="flex items-end gap-6 min-w-175 sm:min-w-full h-full">

                  {brandsData.map((item, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center justify-end flex-1"
                    >
                      {/* BAR GROUP */}
                      <div className="flex items-end gap-2 h-70">

                        {/* BLUE BAR */}
                        <div
                          className="w-3 sm:w-4 bg-blue-500 rounded-t-md transition-all duration-700 ease-out"
                          style={{
                            height: animate ? `${(item.a / max) * 100}%` : "0%",
                            transitionDelay: `${i * 80}ms`,
                          }}
                        />

                        {/* ORANGE BAR */}
                        <div
                          className="w-3 sm:w-4 bg-orange-500 rounded-t-md transition-all duration-700 ease-out"
                          style={{
                            height: animate ? `${(item.b / max) * 100}%` : "0%",
                            transitionDelay: `${i * 80}ms`,
                          }}
                        />
                      </div>

                      {/* LABEL */}
                      <span className="text-[10px] sm:text-xs text-gray-600 mt-3 text-center whitespace-nowrap">
                        {item.name}
                      </span>
                    </div>
                  ))}

                </div>
              </div>
            </div>

            {/* LEGEND */}
            <div className="flex gap-6 mt-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500"></div>
                Metric A
              </div>

              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500"></div>
                Metric B
              </div>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Brands;