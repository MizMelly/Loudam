import React from "react";
import { useNavigate } from "react-router-dom";

export default function ThankYou() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F7FA] px-6">
      <div className="bg-white rounded-3xl shadow-lg p-10 max-w-md text-center">

        <h1 className="text-2xl md:text-3xl font-bold text-[#0A2540] mb-4">
          Complaint Submitted 🎉
        </h1>

        <p className="text-gray-600 mb-6">
          Thank you for reaching out. We’ve received your complaint and sent a confirmation email with your tracking details.
        </p>

        <button
          onClick={() => navigate("/register")}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold"
        >
          Create an Account
        </button>

        <button
          onClick={() => navigate("/")}
          className="mt-3 text-sm text-gray-500 hover:text-gray-700"
        >
          Go Home
        </button>

      </div>
    </div>
  );
}