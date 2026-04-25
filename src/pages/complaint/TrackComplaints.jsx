import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const TrackComplaints = () => {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  // ⭐ NEW
  const [rating, setRating] = useState(0);

  const fixProofUrl = (url) => {
    if (!url) return null;
    if (url.startsWith('http')) return url;
    return `https://loudambackend.onrender.com${url}`;
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchComplaints = async () => {
      try {
        const res = await fetch(
          'https://loudambackend.onrender.com/api/complaints/my',
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const data = await res.json();

        if (res.ok && data.success) {
          setComplaints(data.complaints || []);
        } else {
          setError(data.message || 'Failed to fetch complaints');
        }
      } catch (err) {
        console.error(err);
        setError('Server error. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, [navigate]);

  // ⭐ Reset rating when modal opens
  useEffect(() => {
    if (selectedComplaint) {
      setRating(0);
    }
  }, [selectedComplaint]);

  // ⭐ Handle rating
  const handleRating = async (value) => {
    setRating(value);

    try {
      const token = localStorage.getItem('token');

      await fetch("https://loudambackend.onrender.com/api/ratings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          complaintId: selectedComplaint.id,
          rating: value
        })
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />

      <div className="max-w-full px-6 flex-1 mt-24">
        <h1 className="text-3xl font-bold mb-2 text-gray-900">
          My Complaints
        </h1>

        <p className="text-gray-600 mb-8">
          Track and manage all your filed complaints
        </p>

        {loading ? (
          <p className="text-center py-12">Loading complaints...</p>
        ) : error ? (
          <p className="text-red-500 text-center py-12">{error}</p>
        ) : complaints.length === 0 ? (
          <p className="text-center py-12 text-gray-500">
            No complaints found yet.
          </p>
        ) : (
          <div className="bg-white border shadow-sm rounded-2xl p-4 md:p-6">

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="py-4 px-4 text-left">Business</th>
                    <th className="py-4 px-4 text-left">Subject</th>
                    <th className="py-4 px-4 text-left">Status</th>
                    <th className="py-4 px-4 text-left">Date</th>
                    <th className="py-4 px-4 text-left">Proof</th>
                  </tr>
                </thead>

                <tbody>
                  {complaints.map((c) => (
                    <tr
                      key={c.id}
                      onClick={() => setSelectedComplaint(c)}
                      className="border-b hover:bg-gray-50 cursor-pointer transition"
                    >
                      <td className="py-4 px-4 font-medium">
                        {c.business_name}
                      </td>

                      <td className="py-4 px-4">{c.subject}</td>

                      <td className="py-4 px-4">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full capitalize">
                          {c.status || 'pending'}
                        </span>
                      </td>

                      <td className="py-4 px-4 text-sm text-gray-500">
                        {new Date(c.created_at).toLocaleDateString('en-GB')}
                      </td>

                      <td
                        className="py-4 px-4"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {c.proof_url ? (
                          <a
                            href={fixProofUrl(c.proof_url)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 text-sm hover:underline"
                          >
                            View
                          </a>
                        ) : (
                          <span className="text-gray-400 text-sm">
                            None
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}
      </div>

      {/* MODAL */}
      {selectedComplaint && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4"
          onClick={() => setSelectedComplaint(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl p-6 md:p-8 relative"
          >

            <button
              onClick={() => setSelectedComplaint(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl"
            >
              ✕
            </button>

            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                {selectedComplaint.subject}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {selectedComplaint.business_name}
              </p>
            </div>

            <div className="flex items-center justify-between mb-6">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 capitalize">
                {selectedComplaint.status || 'pending'}
              </span>

              <span className="text-sm text-gray-500">
                {new Date(selectedComplaint.created_at).toLocaleString()}
              </span>
            </div>

            <div className="border-t mb-6"></div>

            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                Complaint Details
              </h3>

              <p className="text-gray-800 leading-relaxed whitespace-pre-line">
                {selectedComplaint.description}
              </p>
            </div>

            {/* PROOF */}
            {selectedComplaint.proof_url && (
              <div className="border-t pt-5">
                <a
                  href={fixProofUrl(selectedComplaint.proof_url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm hover:underline"
                >
                  📎 View Proof File
                </a>
              </div>
            )}

            {/* ⭐ RATING */}
            {selectedComplaint.status === "resolved" && (
              <div className="border-t pt-5 mt-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                  Rate Resolution
                </h3>

                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map((star) => (
                    <span
                      key={star}
                      onClick={() => handleRating(star)}
                      className={`cursor-pointer text-2xl ${
                        star <= rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>

                <p className="text-xs text-gray-500 mt-2">
                  How satisfied are you with how this complaint was handled?
                </p>
              </div>
            )}

          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default TrackComplaints;