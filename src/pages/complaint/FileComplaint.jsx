import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const FileComplaint = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    full_name: '',
    phone_number: '',
    email: '',
    country: 'Nigeria',
    social_handle: '',
    business_name: '',
    category: '',
    subject: '',
    description: '',
    desiredResolution: '',
  });

  const [proof, setProof] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFile = (file) => {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert("File must be less than 5MB");
      return;
    }
    setProof(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = new FormData();

      Object.keys(formData).forEach(key => {
        if (formData[key]) {
          data.append(key, formData[key]);
        }
      });

      if (proof) data.append('proof', proof);

      const headers = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch('https://loudambackend.onrender.com/api/complaints', {
        method: 'POST',
        headers,
        body: data,
      });

      const result = await res.json();

      if (res.ok && result.success) {
        navigate("/thank-you");
        return;
      } else {
        setError(result.message || "Submission failed");
      }

    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError("Server error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7FA]">
      <Navbar />

      <div className="flex-1 py-8 md:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          <button
            onClick={() => navigate(token ? '/dashboard' : '/')}
            className="text-gray-500 hover:text-gray-800 flex items-center gap-2 text-sm mb-4 md:mb-6"
          >
            ← Back
          </button>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0A2540] mb-2">
            File a Complaint
          </h1>

          <p className="text-gray-600 mb-8 md:mb-10 text-sm md:text-base">
            No login required to submit. {token && "You are currently logged in."}
          </p>

          {error && (
            <p className="text-red-600 bg-red-50 p-3 md:p-4 rounded-xl mb-6 text-sm md:text-base">
              {error}
            </p>
          )}

          <div className="bg-white rounded-2xl md:rounded-3xl shadow p-5 sm:p-6 md:p-10 border border-gray-100">

            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">

              {/* USER INFO */}
              <div>
                <h3 className="font-semibold text-base md:text-lg mb-4 text-gray-800">
                  Your Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">

                  <input
                    type="text"
                    name="full_name"
                    placeholder="Full Name *"
                    value={formData.full_name}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 rounded-xl px-4 py-3 text-sm md:text-base"
                  />

                  <input
                    type="tel"
                    name="phone_number"
                    placeholder="Phone Number *"
                    value={formData.phone_number}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 rounded-xl px-4 py-3 text-sm md:text-base"
                  />

                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address *"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 rounded-xl px-4 py-3 text-sm md:text-base md:col-span-2"
                  />

                </div>
              </div>

              {/* DETAILS */}
              <div>
                <h3 className="font-semibold text-base md:text-lg mb-4 text-gray-800">
                  Complaint Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">

                  <input
                    type="text"
                    name="business_name"
                    placeholder="Business Name *"
                    value={formData.business_name}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 rounded-xl px-4 py-3 text-sm md:text-base"
                  />

                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 rounded-xl px-4 py-3 text-sm md:text-base"
                  >
                    <option value="">Select Category</option>
                    <option value="Banking">Banking</option>
                    <option value="Telecoms">Telecoms</option>
                    <option value="E-commerce">E-commerce</option>
                    <option value="Logistics">Logistics</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Fraud">Fraud</option>
                    <option value="Other">Other</option>
                  </select>

                </div>

                <input
                  name="subject"
                  placeholder="Subject *"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="mt-5 md:mt-6 w-full border border-gray-300 rounded-xl px-4 py-3 text-sm md:text-base"
                />

                <textarea
                  name="description"
                  placeholder="Describe your issue..."
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="mt-5 md:mt-6 w-full border border-gray-300 rounded-2xl px-4 py-3 text-sm md:text-base"
                />

              </div>

              {/* UPLOAD */}
              <div>
                <label className="block text-sm mb-2">Upload Proof (Optional)</label>

                <div
                  onClick={() => document.getElementById('proof').click()}
                  className="border-2 border-dashed border-gray-300 rounded-2xl p-6 md:p-10 text-center cursor-pointer hover:border-orange-400 transition"
                >
                  <p className="text-gray-500 text-sm md:text-base">
                    Click or drag & drop file
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    PNG, JPG, PDF (max 5MB)
                  </p>
                </div>

                <input
                  id="proof"
                  type="file"
                  className="hidden"
                  onChange={(e) => handleFile(e.target.files[0])}
                />

                {proof && (
                  <p className="text-green-600 text-sm mt-2">
                    ✓ {proof.name}
                  </p>
                )}
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 md:py-4 rounded-2xl font-semibold text-base md:text-lg disabled:opacity-70"
              >
                {loading ? "Submitting..." : "Submit Complaint"}
              </button>

            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FileComplaint;