import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const res = await api.forgotPassword(email);

    if (res.success) {
      setEmailSent(true);
    } else {
      alert(res.message);
    }
  } catch (err) {
    console.error(err);
    alert("Something went wrong");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">

        {/* Header */}
        <div className="pt-12 pb-8 px-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Forgot Password?</h1>
          <p className="text-gray-600 mt-3 text-[15px]">
            No worries! We'll send you a link to reset your password.
          </p>
        </div>

        <div className="px-8 pb-12">

          {!emailSent ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:border-orange-500"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-400 transition-all py-4 rounded-2xl text-white font-semibold text-lg"
              >
                {loading ? "Sending reset link..." : "Send Reset Link"}
              </button>
            </form>
          ) : (
            /* Success State */
            <div className="text-center py-8">
              <div className="mx-auto w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                ✓
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Check your email</h3>
              <p className="text-gray-600">
                We've sent a password reset link to<br />
                <span className="font-medium text-gray-800">{email}</span>
              </p>
              <p className="text-sm text-gray-500 mt-6">
                Didn't receive the email? Check your spam folder or try again.
              </p>
            </div>
          )}

          {/* Back to Login */}
          <div className="text-center mt-10">
            <span 
              onClick={() => navigate('/login')}
              className="text-orange-500 font-medium cursor-pointer hover:underline"
            >
              ← Back to Login
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;