import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');

      // 🚨 Protect route
      if (!token) {
        navigate('/');
        return;
      }

      try {
        const res = await fetch('http://localhost:5000/api/admin/complaints', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        console.log("ADMIN DATA:", data);

        if (data.success) {
          setComplaints(data.complaints);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [navigate]);

  const updateStatus = async (id, status) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/admin/complaints/${id}/status`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await res.json();

      if (data.success) {
        // ✅ Update UI instantly without refetch
        setComplaints((prev) =>
          prev.map((c) =>
            c.id === id ? { ...c, status } : c
          )
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="bg-white border shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="p-4 text-left">User Email</th>
              <th className="p-4 text-left">Business</th>
              <th className="p-4 text-left">Subject</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Date</th>
            </tr>
          </thead>

          <tbody>
            {complaints.map((c) => (
              <tr key={c.id} className="border-b">
                <td className="p-4">{c.email}</td>
                <td className="p-4">{c.business_name}</td>
                <td className="p-4">{c.subject}</td>

                <td className="p-4">
                  <select
                    value={c.status || 'Pending'}
                    onChange={(e) => updateStatus(c.id, e.target.value)}
                    className="border px-2 py-1"
                  >
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Resolved</option>
                  </select>
                </td>

                <td className="p-4">
                  {new Date(c.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;