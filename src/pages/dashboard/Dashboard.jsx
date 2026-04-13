import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    console.log("🔍 Dashboard: Token found?", !!token);
    console.log("🔍 Dashboard: Stored user?", !!storedUser);

    if (!token || !storedUser) {
      console.log("No token or user → redirecting to login");
      navigate('/login', { replace: true });
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      console.log("✅ User loaded:", parsedUser);
      fetchComplaints(token);
    } catch (err) {
      console.error("Failed to parse user data", err);
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  const fetchComplaints = async (token) => {
    try {
      console.log("🔄 Fetching complaints with token:", token ? token.substring(0, 15) + "..." : "NO TOKEN");

      const res = await fetch('http://localhost:5000/api/complaints/my', {
        headers: { 
          'Authorization': `Bearer ${token}` 
        }
      });

      const data = await res.json();
      console.log("📥 Complaints API response:", data);

      if (res.ok && data.success) {
        setComplaints(data.complaints || []);
        console.log("✅ Loaded", data.complaints?.length || 0, "complaints");
      } else {
        console.error("API returned error:", data);
      }
    } catch (err) {
      console.error("❌ Failed to fetch complaints", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');
    }
  };

  // Calculate real stats
  const total = complaints.length;
  const submitted = complaints.filter(c => 
    c.status?.toLowerCase() === 'submitted' || c.status?.toLowerCase() === 'pending'
  ).length;
  const inProgress = complaints.filter(c => 
    c.status?.toLowerCase() === 'in_progress' || c.status?.toLowerCase() === 'under_review'
  ).length;
  const resolved = complaints.filter(c => 
    c.status?.toLowerCase() === 'resolved'
  ).length;

  const recentComplaints = [...complaints]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 5);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      <Navbar />

      {/* Main Content */}
      <div className="w-full px-10 lg:px-16 py-10 flex-1">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              Welcome, {user?.full_name || user?.fullName || "User"}
            </h1>
            <p className="text-gray-600 mt-1">Track and manage all your filed complaints</p>
          </div>

          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <span className="text-gray-600">{user?.email}</span>
            <button
              onClick={() => navigate('/file-complaint')}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-2xl font-semibold flex items-center gap-2"
            >
              + New Complaint
            </button>
          </div>
        </div>

        {/* Stats Cards */}
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

        {/* Recent Complaints Table */}
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
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">
                You haven't filed any complaints yet
              </p>

              <button
                onClick={() => navigate('/file-complaint')}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-xl font-medium"
              >
                File First Complaint
              </button>
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
                  {recentComplaints.map((c) => (
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
                            c.status === 'resolved'
                              ? 'bg-green-100 text-green-700'
                              : c.status === 'in_progress'
                              ? 'bg-orange-100 text-orange-700'
                              : 'bg-blue-100 text-blue-700'
                          }`}
                        >
                          {c.status || 'submitted'}
                        </span>
                      </td>

                      <td className="py-5 text-gray-500 text-sm">
                        {new Date(c.created_at).toLocaleDateString('en-GB')}
                      </td>
                    </tr>
                  ))}
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