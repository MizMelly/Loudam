import React from "react";
import { motion } from "framer-motion";
import {
  Shield,
  BarChart3,
  Users,
  Eye,
  Zap,
  Globe,
} from "lucide-react";

const features = [
  {
    icon: <Shield size={22} />,
    title: "Consumer Protection",
    desc: "Structured complaints brands can't ignore.",
  },
  {
    icon: <BarChart3 size={22} />,
    title: "Data Insights",
    desc: "Real-time accountability data.",
  },
  {
    icon: <Users size={22} />,
    title: "Brand Accountability",
    desc: "Companies respond through structured channels.",
  },
  {
    icon: <Eye size={22} />,
    title: "Transparency",
    desc: "Track complaints from submission to resolution.",
  },
  {
    icon: <Zap size={22} />,
    title: "Fast Resolution",
    desc: "Streamlined complaint handling.",
  },
  {
    icon: <Globe size={22} />,
    title: "Built for Africa",
    desc: "Designed for African digital commerce.",
  },
];

const Whyloudam = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-14">
          <h5 className="text-2xl font-bold text-[#FF6F00]">
            Why Loudam
          </h5>

          <h3 className="mt-4 text-2xl sm:text-3xl font-bold text-[#0B2545] leading-tight">
            Trust Infrastructure for Digital Commerce
          </h3>

          <p className="mt-4 text-gray-600 text-base max-w-xl mx-auto">
            A structured accountability system for consumers and brands.
          </p>
        </div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((item, index) => (
            <div
              key={index}
              className="group bg-white border border-gray-200 rounded-2xl p-7 hover:shadow-md transition"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#EEF3F8] text-[#0B2545] mb-5">
                {item.icon}
              </div>

              <h3 className="text-lg font-semibold text-[#0B2545] mb-2">
                {item.title}
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Whyloudam;