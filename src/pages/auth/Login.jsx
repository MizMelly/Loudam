import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from "@react-oauth/google";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [showForgot, setShowForgot] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const [resetMessage, setResetMessage] = useState('');

  const API = "https://loudambackend.onrender.com";

  // ================= EMAIL LOGIN =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user || {}));

        setIsAuthenticated(true);

        const decoded = JSON.parse(atob(data.token.split('.')[1]));

        navigate(decoded.role === 'admin' ? '/admin' : '/dashboard', {
          replace: true,
        });
      } else {
        setError(data.message || "Invalid email or password");
      }
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError("Cannot connect to server.");
    } finally {
      setLoading(false);
    }
  };

  // ================= GOOGLE LOGIN =================
  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const res = await fetch(`${API}/api/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: credentialResponse.credential,
        }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        setIsAuthenticated(true);

        const decoded = JSON.parse(atob(data.token.split(".")[1]));

        navigate(decoded.role === "admin" ? "/admin" : "/dashboard", {
          replace: true,
        });
      }
    } catch (err) {
      console.log("Google login error:", err);
    }
  };

  // ================= APPLE LOGIN (RESTORED UI SAFE) =================
  const handleAppleLogin = () => {
    alert("Apple Login is not configured yet.");
  };

  // ================= FORGOT PASSWORD =================
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setResetLoading(true);
    setResetMessage('');

    try {
      const res = await fetch(`${API}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: resetEmail })
      });

      const data = await res.json();

      if (res.ok) {
        setResetMessage("Reset link sent to your email.");
      } else {
        setResetMessage(data.message || "Something went wrong.");
      }
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setResetMessage("Server error.");
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">

      <Navbar />

      <div className="grow flex items-center justify-center px-4 py-10">
        <div className="bg-white w-full max-w-md rounded-3xl shadow-xl p-8">

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Welcome Back</h1>
            <p className="text-gray-500 text-sm mt-2">
              Sign in to manage your complaints
            </p>
          </div>

          {/* GOOGLE LOGIN */}
          <div className="mb-3">
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => console.log("Google login failed")}
            />
          </div>

          {/* APPLE LOGIN (RESTORED EXACT UI) */}
          <button
            onClick={handleAppleLogin}
            className="w-full border border-gray-300 rounded-xl py-3 flex items-center justify-center gap-3 hover:bg-gray-50 transition mb-3"
          >
            <span className="text-lg"></span>
            <span className="text-gray-700 font-medium">
              Continue with Apple
            </span>
          </button>

          {/* DIVIDER */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-xs text-gray-400">
              OR CONTINUE WITH EMAIL
            </span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* ERROR */}
          {error && (
            <p className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-xl">
              {error}
            </p>
          )}

          {/* EMAIL LOGIN */}
          <form onSubmit={handleSubmit} className="space-y-5">

            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 border rounded-xl"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />

            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 border rounded-xl"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />

              <p
                onClick={() => setShowForgot(true)}
                className="text-sm text-orange-500 mt-2 cursor-pointer hover:underline"
              >
                Forgot password?
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 text-white py-3 rounded-xl"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
{/* 👇 ADD THIS BACK */}
<p className="text-center text-sm text-gray-500 mt-4">
  Don’t have an account?{" "}
  <span
    onClick={() => navigate("/register")}
    className="text-orange-500 cursor-pointer hover:underline font-medium"
  >
    Register
  </span>
</p>
          </form>
        </div>
      </div>

      {/* FORGOT PASSWORD MODAL */}
      {showForgot && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-4 z-50">

          <div className="bg-white w-full max-w-md rounded-2xl p-6">

            <h2 className="text-xl font-semibold mb-2">
              Forgot Password
            </h2>

            <form onSubmit={handleForgotPassword} className="space-y-4">

              <input
                type="email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                className="w-full px-4 py-3 border rounded-xl"
                placeholder="you@example.com"
                required
              />

              {resetMessage && (
                <p className="text-sm text-green-600 text-center">
                  {resetMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={resetLoading}
                className="w-full bg-orange-500 text-white py-3 rounded-xl"
              >
                {resetLoading ? "Sending..." : "Send Reset Link"}
              </button>

              <button
                type="button"
                onClick={() => setShowForgot(false)}
                className="w-full text-sm text-gray-500"
              >
                Cancel
              </button>

            </form>

          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Login;