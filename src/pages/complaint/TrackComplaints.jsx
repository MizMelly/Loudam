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
          <div className="bg-white overflow-hidden border border-gray-100 shadow-sm">
            <table className="w-full table-fixed">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="py-4 px-6 text-left font-medium text-gray-700">Business</th>
                  <th className="py-4 px-6 text-left font-medium text-gray-700">Subject</th>
                  <th className="py-4 px-6 text-left font-medium text-gray-700">Description</th>
                  <th className="py-4 px-6 text-left font-medium text-gray-700">Status</th>
                  <th className="py-4 px-6 text-left font-medium text-gray-700">Date</th>
                  <th className="py-4 px-6 text-left font-medium text-gray-700">Proof</th>
                </tr>
              </thead>
              <tbody>
                {complaints.map((c) => (
                  <tr 
                    key={c.id}
                    className="border-b last:border-none hover:bg-gray-50 transition"
                  >
                    <td className="py-5 px-6 font-medium text-gray-900">
                      {c.business_name}
                    </td>
                    <td className="py-5 px-6 text-gray-700">
                      {c.subject}
                    </td>
                    <td className="py-5 px-6 text-gray-600 max-w-lg">
                      {c.description}
                    </td>
                    <td className="py-5 px-6">
                      <span className="px-4 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                        {c.status || 'Pending'}
                      </span>
                    </td>
                    <td className="py-5 px-6 text-gray-500 text-sm">
                      {new Date(c.created_at).toLocaleDateString('en-GB')}
                    </td>
                    <td className="py-5 px-6">
                      {c.proof_url ? (
                        <a 
                          href={c.proof_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline text-sm"
                        >
                          View Proof
                        </a>
                      ) : (
                        <span className="text-gray-400 text-sm">No proof</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default TrackComplaints;