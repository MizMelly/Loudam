import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { GoogleLogin } from "@react-oauth/google";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const payload = {
      full_name: formData.fullName,
      phone_number: formData.phone,
      email: formData.email,
      password: formData.password,
    };

    try {
      const res = await api.register(payload);

      if (res.success) {
        navigate('/login');
      } else {
        setError(res.message || 'Registration failed');
      }
    } catch (err) {
      console.error(err);
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ✅ GOOGLE LOGIN
  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const res = await fetch(
        "https://loudambackend.onrender.com/api/auth/google",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            token: credentialResponse.credential,
          }),
        }
      );

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        const decoded = JSON.parse(atob(data.token.split(".")[1]));

        navigate(decoded.role === "admin" ? "/admin" : "/dashboard", {
          replace: true,
        });
      } else {
        setError(data.message || "Google signup failed");
      }
    } catch (err) {
      console.log("Google signup error:", err);
      setError("Google signup failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">

        {/* Back Button */}
        <div className="pt-6 px-8">
          <button
            onClick={() => navigate('/login')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition"
          >
            ← Back to Home
          </button>
        </div>

        {/* Header */}
        <div className="pt-8 pb-6 px-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
          <p className="text-gray-600 mt-2">Join Loudam to hold brands accountable</p>
        </div>

        <div className="px-8 pb-10">

          {/* ERROR */}
          {error && (
            <p className="text-red-500 mb-4 text-center">{error}</p>
          )}

          {/* ✅ GOOGLE LOGIN */}
          <div className="mb-4">
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => setError("Google signup failed")}
            />
          </div>

          {/* divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-xs text-gray-500 font-medium">
              OR CONTINUE WITH EMAIL
            </span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-5">

            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full px-5 py-3.5 border rounded-2xl"
              required
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full px-5 py-3.5 border rounded-2xl"
              required
            />

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full px-5 py-3.5 border rounded-2xl"
              required
            />

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-5 py-3.5 border rounded-2xl"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 py-4 rounded-2xl text-white font-semibold"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          {/* LOGIN LINK */}
          <p className="text-center text-sm text-gray-600 mt-8">
            Already have an account?{" "}
            <span
              onClick={() => navigate('/login')}
              className="text-orange-500 font-medium cursor-pointer hover:underline"
            >
              Sign in
            </span>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Register;