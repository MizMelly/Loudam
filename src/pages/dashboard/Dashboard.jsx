import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';

// ✅ FIX: normalize all backend statuses safely
const normalizeStatus = (status) => {
  if (!status) return 'submitted';

  const s = status.toLowerCase();

  if (s.includes('progress')) return 'in_progress';
  if (s.includes('resolve')) return 'resolved';
  if (s.includes('pending') || s.includes('submit')) return 'submitted';

  return 'submitted';
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (!token || !storedUser) {
      navigate('/login', { replace: true });
      return;
    }

    try {
      setUser(JSON.parse(storedUser));
      fetchComplaints(token);
    } catch (err) {
      console.error(err);
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  const fetchComplaints = async (token) => {
    try {
      const res = await fetch('http://localhost:5000/api/complaints/my', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // ✅ normalize statuses once on load
        const cleaned = (data.complaints || []).map((c) => ({
          ...c,
          status: normalizeStatus(c.status)
        }));

        setComplaints(cleaned);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  // 📊 FIXED STATS (no design change)
  const total = complaints.length;

  const submitted = complaints.filter(
    (c) => normalizeStatus(c.status) === 'submitted'
  ).length;

  const inProgress = complaints.filter(
    (c) => normalizeStatus(c.status) === 'in_progress'
  ).length;

  const resolved = complaints.filter(
    (c) => normalizeStatus(c.status) === 'resolved'
  ).length;

  const recentComplaints = [...complaints]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 5);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      <Navbar />

      <div className="w-full px-10 lg:px-16 py-10 flex-1">

        {/* HEADER (UNCHANGED) */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              Welcome, {user?.full_name || user?.fullName || "User"}
            </h1>
            <p className="text-gray-600 mt-1">
              Track and manage all your filed complaints
            </p>
          </div>

          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <span className="text-gray-600">{user?.email}</span>

            <button
              onClick={() => navigate('/file-complaint')}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-2xl font-semibold flex items-center gap-2"
            >
              + New Complaint
            </button>

            <button
              onClick={handleLogout}
              className="border border-red-500 text-red-500 px-4 py-2 rounded-xl"
            >
              Logout
            </button>
          </div>
        </div>

        {/* STATS (ONLY VALUE FIXED) */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-12">

          <div className="bg-white rounded-3xl p-10 border border-gray-100 shadow-sm">
            <p className="text-gray-500 text-sm mb-2">Total Complaints</p>
            <h2 className="text-5xl font-bold text-gray-900">{total}</h2>
          </div>

          <div className="bg-white rounded-3xl p-10 border border-gray-100 shadow-sm">
            <p className="text-gray-500 text-sm mb-2">Submitted</p>
            <h2 className="text-5xl font-bold text-blue-600">{submitted}</h2>
          </div>

          <div className="bg-white rounded-3xl p-10 border border-gray-100 shadow-sm">
            <p className="text-gray-500 text-sm mb-2">In Progress</p>
            <h2 className="text-5xl font-bold text-orange-600">{inProgress}</h2>
          </div>

          <div className="bg-white rounded-3xl p-10 border border-gray-100 shadow-sm">
            <p className="text-gray-500 text-sm mb-2">Resolved</p>
            <h2 className="text-5xl font-bold text-green-600">{resolved}</h2>
          </div>

        </div>

        {/* TABLE (ONLY STATUS FIXED, NO LAYOUT CHANGE) */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Recent Complaints</h2>

            <button
              onClick={() => navigate('/track-complaints')}
              className="text-blue-600 hover:text-blue-800 font-medium text-sm"
            >
              View All
            </button>
          </div>

          {recentComplaints.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              You haven't filed any complaints yet
            </div>
          ) : (
            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>
                  <tr className="text-gray-500 text-sm border-b">
                    <th className="pb-4 text-left">Business</th>
                    <th className="pb-4 text-left">Subject</th>
                    <th className="pb-4 text-left">Status</th>
                    <th className="pb-4 text-left">Date</th>
                  </tr>
                </thead>

                <tbody>
                  {recentComplaints.map((c) => {
                    const status = normalizeStatus(c.status);

                    return (
                      <tr
                        key={c.id}
                        onClick={() => navigate(`/complaint/${c.id}`)}
                        className="border-b last:border-none hover:bg-gray-50 cursor-pointer transition"
                      >
                        <td className="py-5 font-medium text-gray-900">
                          {c.business_name}
                        </td>

                        <td className="py-5 text-gray-600 max-w-xs truncate">
                          {c.subject}
                        </td>

                        <td className="py-5">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                              status === 'resolved'
                                ? 'bg-green-100 text-green-700'
                                : status === 'in_progress'
                                ? 'bg-orange-100 text-orange-700'
                                : 'bg-blue-100 text-blue-700'
                            }`}
                          >
                            {status}
                          </span>
                        </td>

                        <td className="py-5 text-gray-500 text-sm">
                          {new Date(c.created_at).toLocaleDateString('en-GB')}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>

              </table>

            </div>
          )}

        </div>

      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;