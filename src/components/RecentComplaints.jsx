import React from "react";
import { useNavigate } from "react-router-dom";

const RecentComplaints = () => {
  const navigate = useNavigate();

  const complaints = [
    {
      id: "LDM-4920-X",
      title: "Delayed Fund Transfer",
      category: "Banking • Fund Transfer",
      business: "Access Bank",
      time: "2 hours ago",
      status: "submitted",
    },
    {
      id: "LDM-4918-R",
      title: "Flight Cancellation Without Refund",
      category: "Aviation • Refund",
      business: "Air Peace",
      time: "5 hours ago",
      status: "submitted",
    },
    {
      id: "LDM-4915-K",
      title: "Unauthorized Data Deduction",
      category: "Telecoms • Billing",
      business: "MTN Nigeria",
      time: "1 day ago",
      status: "resolved",
    },
    {
      id: "LDM-4912-T",
      title: "Package Not Delivered",
      category: "E-commerce • Delivery",
      business: "Jumia",
      time: "1 day ago",
      status: "in_progress",
    },
  ];

  const getStatusConfig = (status) => {
    switch (status) {
      case "resolved":
        return {
          label: "RESOLVED",
          className: "bg-emerald-100 text-emerald-700",
        };
      case "in_progress":
        return {
          label: "IN PROGRESS",
          className: "bg-blue-100 text-blue-700",
        };
      default:
        return {
          label: "SUBMITTED",
          className: "bg-gray-100 text-gray-700",
        };
    }
  };

  return (
    <section className="py-24 bg-[#F3F6F9] overflow-hidden">
      <div className="max-w-7xl mx-auto px-3">

        {/* Header */}
        <div className="flex items-end justify-between mb-6">
          <div>
            <h4 className="text-2xl sm:text-3xl font-bold text-[#1F2A37]">
              Recent Complaints
            </h4>

            <p className="text-lg text-[#6B7C93] mt-3">
              Latest accountability reports from consumers.
            </p>
          </div>

          <button
            onClick={() => navigate("/track-complaints")}
            className="text-[#FF7A00] font-semibold hover:underline"
          >
            View all →
          </button>
        </div>

        {/* Moving Cards */}
        <div className="relative">
          <div className="flex gap-6 animate-scroll">

            {[...complaints, ...complaints].map((complaint, index) => {
              const status = getStatusConfig(complaint.status);

              return (
                <div
                  key={index}
                  className="min-w-[320px] bg-[#F8FAFC] rounded-2xl p-7 border border-gray-200 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="font-mono text-xs text-[#6B7C93]">
                        {complaint.id}
                      </p>

                      <h3 className="font-semibold text-lg mt-2 text-[#1F2A37]">
                        {complaint.title}
                      </h3>
                    </div>

                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${status.className}`}
                    >
                      {status.label}
                    </span>
                  </div>

                  <p className="text-sm text-[#6B7C93] mb-3">
                    {complaint.category}
                  </p>

                  <p className="text-sm text-gray-500 mb-6">
                    {complaint.time}
                  </p>

                  <div className="pt-4 border-t border-gray-200 flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#173B6C] text-white rounded-full flex items-center justify-center text-xs font-semibold">
                      {complaint.business.substring(0, 2)}
                    </div>

                    <span className="text-sm text-[#1F2A37]">
                      {complaint.business}
                    </span>
                  </div>
                </div>
              );
            })}

          </div>
        </div>

      </div>
    </section>
  );
};

export default RecentComplaints;