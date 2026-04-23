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
  const [success, setSuccess] = useState(false);
  const [trackingId, setTrackingId] = useState('');

  const token = localStorage.getItem('token'); // Check if user is logged in

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
      if (formData[key] !== undefined && formData[key] !== '') {
        data.append(key, formData[key]);
      }
    });

    if (proof) {
      data.append('proof', proof);
    }

    const token = localStorage.getItem('token');

    const headers = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    console.log("Submitting complaint...", token ? "with token" : "as guest");

    const res = await fetch('http://localhost:5000/api/complaints', {
      method: 'POST',
      headers: headers,        // Send token if available
      body: data,
    });

    const result = await res.json();
    console.log("Backend response:", result);

    if (res.ok && result.success) {
      setSuccess(true);
      setTrackingId(result.trackingId || 'N/A');
      
      alert(`✅ Complaint submitted successfully!\n\nTracking ID: ${result.trackingId || 'N/A'}`);

      // Reset form
      setFormData({
        full_name: '', phone_number: '', email: '', country: 'Nigeria',
        social_handle: '', business_name: '', category: '', subject: '',
        description: '', desiredResolution: ''
      });
      setProof(null);
    } else {
      setError(result.message || "Failed to submit complaint");
    }
  } catch (err) {
    console.error("Submit error:", err);
    setError("Cannot connect to server. Please make sure backend is running.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7FA]">
      <Navbar />

      <div className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-6">

          {/* Back Button - Smart: Dashboard if logged in, Home if not */}
          <button
            onClick={() => navigate(token ? '/dashboard' : '/')}
            className="text-gray-500 hover:text-gray-800 flex items-center gap-2 text-sm mb-6"
          >
            ← Back
          </button>

          <h1 className="text-4xl font-bold text-[#0A2540] mb-2">File a Complaint</h1>
          <p className="text-gray-600 mb-10">
            No login required to submit. {token && "You are currently logged in."}
          </p>

          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-5 rounded-2xl mb-8">
              Complaint submitted successfully!<br />
              Tracking ID: <strong>{trackingId}</strong><br />
              A confirmation email has been sent to your email address.
            </div>
          )}

          {error && <p className="text-red-600 bg-red-50 p-4 rounded-xl mb-6">{error}</p>}

          <div className="bg-white rounded-3xl shadow p-8 md:p-10 border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-8">

              {/* Your Information */}
              <div>
                <h3 className="font-semibold text-lg mb-4 text-gray-800">Your Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input type="text" name="full_name" placeholder="Full Name *" value={formData.full_name} onChange={handleChange} required className="border border-gray-300 rounded-xl px-4 py-3" />
                  <input type="tel" name="phone_number" placeholder="Phone Number *" value={formData.phone_number} onChange={handleChange} required className="border border-gray-300 rounded-xl px-4 py-3" />
                  <input type="email" name="email" placeholder="Email Address *" value={formData.email} onChange={handleChange} required className="border border-gray-300 rounded-xl px-4 py-3 md:col-span-2" />
                </div>
              </div>

              {/* Complaint Details */}
              <div>
                <h3 className="font-semibold text-lg mb-4 text-gray-800">Complaint Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input type="text" name="business_name" placeholder="Business / Brand Name *" value={formData.business_name} onChange={handleChange} required className="border border-gray-300 rounded-xl px-4 py-3" />
                  <select
  name="category"
  value={formData.category}
  onChange={handleChange}
  required
  className="border border-gray-300 rounded-xl px-4 py-3"
>
  <option value="">Select Category</option>

  {/* Banking */}
  <option value="Banking - Account Issues">Banking · Account Issues</option>
  <option value="Banking - Card Services">Banking · Card Services</option>

  {/* Telecoms */}
  <option value="Telecoms - Billing">Telecoms · Billing</option>
  <option value="Telecoms - Network">Telecoms · Network</option>

  {/* Aviation */}
  <option value="Aviation - Flight Issues">Aviation · Flight Issues</option>
  <option value="Aviation - Refund">Aviation · Refund</option>

  {/* E-commerce */}
  <option value="E-commerce - Delivery">E-commerce · Delivery</option>
  <option value="E-commerce - Product Quality">E-commerce · Product Quality</option>

  {/* Logistics */}
  <option value="Logistics - Delayed Delivery">Logistics · Delayed Delivery</option>

  {/* Utilities */}
  <option value="Utilities - Power Supply">Utilities · Power Supply</option>
  <option value="Utilities - Billing">Utilities · Billing</option>

  {/* General */}
  <option value="Billing Issue">Billing Issue</option>
  <option value="Poor Service">Poor Service</option>
  <option value="Delivery Issue">Delivery Issue</option>
  <option value="Fraud">Fraud</option>
  <option value="Refund Delay">Refund Delay</option>
  <option value="Other">Other</option>
</select>
                </div>

                <input type="text" name="subject" placeholder="Subject *" value={formData.subject} onChange={handleChange} required className="mt-6 w-full border border-gray-300 rounded-xl px-4 py-3" />

                <textarea name="description" placeholder="Describe what happened..." value={formData.description} onChange={handleChange} required rows="5" className="mt-6 w-full border border-gray-300 rounded-2xl px-4 py-3" />

                <textarea name="desiredResolution" placeholder="How would you like this resolved?" value={formData.desiredResolution} onChange={handleChange} rows="3" className="mt-6 w-full border border-gray-300 rounded-2xl px-4 py-3" />
              </div>

              {/* Proof Upload */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">Upload Proof (Optional)</label>
                <div
                  onClick={() => document.getElementById('proof').click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => { e.preventDefault(); handleFile(e.dataTransfer.files[0]); }}
                  className="border-2 border-dashed border-gray-300 rounded-2xl p-10 text-center cursor-pointer hover:border-orange-400 transition"
                >
                  <p className="text-gray-500">Click or drag & drop files here</p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG, PDF (max 5MB)</p>
                </div>
                <input id="proof" type="file" accept=".png,.jpg,.jpeg,.pdf" className="hidden" onChange={(e) => handleFile(e.target.files[0])} />

                {proof && <p className="text-green-600 text-sm mt-2">✓ {proof.name}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl font-semibold text-lg disabled:opacity-70"
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