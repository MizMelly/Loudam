import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const TrackComplaints = () => {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchComplaints = async () => {
      try {
        const res = await fetch('https://loudambackend.onrender.com/api/complaints/my', {
          headers: { 
            'Authorization': `Bearer ${token}` 
          }
        });

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

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      
      <Navbar />

      <div className="max-w-full px-6 flex-1 mt-10">
        <h1 className="text-3xl font-bold mb-2 text-gray-900">My Complaints</h1>
        <p className="text-gray-600 mb-8">Track and manage all your filed complaints</p>

        {loading ? (
          <p className="text-center py-12">Loading complaints...</p>
        ) : error ? (
          <p className="text-red-500 text-center py-12">{error}</p>
        ) : complaints.length === 0 ? (
          <p className="text-center py-12 text-gray-500">No complaints found yet.</p>
        ) : (
         <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-4 md:p-6">

  {/* DESKTOP TABLE */}
  <div className="hidden md:block overflow-x-auto">
    <table className="w-full">
      <thead>
        <tr className="bg-gray-50 border-b">
          <th className="py-4 px-4 text-left text-gray-700">Business</th>
          <th className="py-4 px-4 text-left text-gray-700">Subject</th>
          <th className="py-4 px-4 text-left text-gray-700">Status</th>
          <th className="py-4 px-4 text-left text-gray-700">Date</th>
          <th className="py-4 px-4 text-left text-gray-700">Proof</th>
        </tr>
      </thead>

      <tbody>
        {complaints.map((c) => (
          <tr key={c.id} className="border-b hover:bg-gray-50">
            <td className="py-4 px-4 font-medium">{c.business_name}</td>
            <td className="py-4 px-4">{c.subject}</td>
            <td className="py-4 px-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                {c.status || 'Pending'}
              </span>
            </td>
            <td className="py-4 px-4 text-sm text-gray-500">
              {new Date(c.created_at).toLocaleDateString('en-GB')}
            </td>
            <td className="py-4 px-4">
              {c.proof_url ? (
                <a href={c.proof_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm">
                  View
                </a>
              ) : (
                <span className="text-gray-400 text-sm">None</span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* MOBILE CARDS */}
  <div className="md:hidden space-y-4">
    {complaints.map((c) => (
      <div key={c.id} className="border rounded-xl p-4 shadow-sm">

        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-900 text-sm">
            {c.business_name}
          </h3>

          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
            {c.status || 'Pending'}
          </span>
        </div>

        <p className="text-sm text-gray-700 mb-2">
          {c.subject}
        </p>

        <p className="text-xs text-gray-500 mb-3 line-clamp-2">
          {c.description}
        </p>

        <div className="flex justify-between items-center text-xs text-gray-500">
          <span>
            {new Date(c.created_at).toLocaleDateString('en-GB')}
          </span>

          {c.proof_url ? (
            <a
              href={c.proof_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-medium"
            >
              View Proof
            </a>
          ) : (
            <span className="text-gray-400">No proof</span>
          )}
        </div>

      </div>
    ))}
  </div>

</div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default TrackComplaints;