import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');

  try {
    const response = await fetch('https://loudambackend.onrender.com/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    console.log("🔍 Backend response:", data);

    if (response.ok && data.success && data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user || {}));

      setIsAuthenticated(true);

      // ✅ Decode JWT to check role
      const decoded = JSON.parse(atob(data.token.split('.')[1]));

      console.log("DECODED TOKEN:", decoded);

      if (decoded.role === 'admin') {
        navigate('/admin', { replace: true });
      } else {
        navigate('/dashboard', { replace: true });
      }

    } else {
      setError(data.message || "Invalid email or password");
    }

  } catch (err) {
    console.error("Login error:", err);
    setError("Cannot connect to server. Is backend running?");
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">

      <Navbar />

      <div className="grow flex items-center justify-center px-4 py-10">
        <div className="bg-white w-full max-w-md rounded-3xl shadow-xl p-8">

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
            <p className="text-gray-500 mt-2 text-sm">
              Sign in to track and manage your complaints
            </p>
          </div>

          {/* Social Buttons */}
          <button className="w-full border border-gray-300 rounded-xl py-3 flex items-center justify-center gap-3 hover:bg-gray-50 transition mb-3">
            <img 
              src="https://www.svgrepo.com/show/475656/google-color.svg" 
              alt="google" 
              className="w-5 h-5"
            />
            <span className="text-gray-700 font-medium">Continue with Google</span>
          </button>

          <button className="w-full border border-gray-300 rounded-xl py-3 flex items-center justify-center gap-3 hover:bg-gray-50 transition">
            <span className="text-lg"></span>
            <span className="text-gray-700 font-medium">Continue with Apple</span>
          </button>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-xs text-gray-400">OR CONTINUE WITH EMAIL</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <p className="text-red-500 text-center text-sm bg-red-50 p-3 rounded-xl">
                {error}
              </p>
            )}

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-orange-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-orange-500 outline-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 py-3.5 rounded-xl text-white font-semibold disabled:opacity-70 transition"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{' '}
            <span 
              onClick={() => navigate('/register')} 
              className="text-orange-500 cursor-pointer hover:underline"
            >
              Sign up
            </span>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;