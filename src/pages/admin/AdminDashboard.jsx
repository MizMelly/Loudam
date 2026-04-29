import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const PAGE_SIZE = 8;

const AdminDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState("");
  const [businessSearch, setBusinessSearch] = useState("");
  const [trackingSearch, setTrackingSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const openComplaintDetails = (complaint) => {
    setSelectedComplaint(complaint);
    setShowModal(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/");
        return;
      }

      try {
        const res = await fetch(
          "https://loudambackend.onrender.com/api/admin/complaints",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = await res.json();
        if (data.success) setComplaints(data.complaints);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [navigate]);

  const updateStatus = async (id, status) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      await fetch(
        `https://loudambackend.onrender.com/api/admin/complaints/${id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      setComplaints((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status } : c))
      );
    } catch (err) {
      console.error(err);
    }
  };

  // 🔍 FILTER LOGIC
  const filteredComplaints = useMemo(() => {
    return complaints.filter((c) => {
      const s = search.toLowerCase();
      const b = businessSearch.toLowerCase();
      const t = trackingSearch.toLowerCase();

      const matchSearch =
        search === "" ||
        c.email?.toLowerCase().includes(s) ||
        c.subject?.toLowerCase().includes(s) ||
        c.business_name?.toLowerCase().includes(s);

      const matchBusiness =
        businessSearch === "" ||
        c.business_name?.toLowerCase().includes(b);

      const matchTracking =
        trackingSearch === "" ||
        c.tracking_id?.toLowerCase().includes(t);

      const matchStatus =
        statusFilter === "All" ||
        c.status?.trim().toLowerCase() === statusFilter.toLowerCase();

      return matchSearch && matchBusiness && matchTracking && matchStatus;
    });
  }, [complaints, search, businessSearch, trackingSearch, statusFilter]);

  // 📄 PAGINATION
  const totalPages = Math.ceil(filteredComplaints.length / PAGE_SIZE);

  const paginated = filteredComplaints.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  // 📊 STATS
  const stats = useMemo(() => {
    return {
      total: complaints.length,
      pending: complaints.filter(
        (c) => c.status?.trim().toLowerCase() === "pending"
      ).length,
      inProgress: complaints.filter(
        (c) => c.status?.trim().toLowerCase() === "in progress"
      ).length,
      resolved: complaints.filter(
        (c) => c.status?.trim().toLowerCase() === "resolved"
      ).length,
    };
  }, [complaints]);

  const resolvedPercent = stats.total
    ? Math.round((stats.resolved / stats.total) * 100)
    : 0;
return (
  <div className="min-h-screen p-4 sm:p-6 bg-linear-to-br from-slate-100 via-blue-100 to-indigo-200">

    {/* HEADER */}
    <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-3">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
        Admin Dashboard
      </h1>

      <button
        onClick={handleLogout}
        className="bg-white border border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-4 py-2 rounded-xl transition"
      >
        Logout
      </button>
    </div>

    {/* STATS */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card title="Total" value={stats.total} />
      <Card title="Pending" value={stats.pending} />
      <Card title="In Progress" value={stats.inProgress} />
      <Card title="Resolved %" value={`${resolvedPercent}%`} />
    </div>

    {/* SEARCH BAR */}
    <div className="bg-white p-4 rounded-xl shadow mb-6 flex flex-col md:flex-row gap-3">
      <input
        className="flex-1 p-2 border rounded"
        placeholder="Search email or subject..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <input
        className="flex-1 p-2 border rounded"
        placeholder="Business..."
        value={businessSearch}
        onChange={(e) => setBusinessSearch(e.target.value)}
      />

      <input
        className="flex-1 p-2 border rounded"
        placeholder="Tracking ID..."
        value={trackingSearch}
        onChange={(e) => setTrackingSearch(e.target.value)}
      />

      <select
        className="p-2 border rounded"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option>All</option>
        <option>Pending</option>
        <option>In Progress</option>
        <option>Resolved</option>
      </select>
    </div>

    {/* TABLE */}
    <div className="hidden md:block bg-white shadow rounded-xl overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-100 text-gray-600">
          <tr>
            <th className="p-3 text-left">Tracking</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Business</th>
            <th className="p-3 text-left">Subject</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Date</th>
          </tr>
        </thead>

        <tbody>
          {paginated.map((c) => (
            <tr
              key={c.id}
              onClick={() => openComplaintDetails(c)}
              className="border-b hover:bg-gray-50 cursor-pointer"
            >
              <td className="p-3 text-blue-600 font-mono">
                {c.tracking_id}
              </td>

              <td className="p-3">{c.email}</td>
              <td className="p-3 font-medium">{c.business_name}</td>
              <td className="p-3">{c.subject}</td>

              <td
                className="p-3"
                onClick={(e) => e.stopPropagation()}
              >
                <select
                  value={c.status}
                  onChange={(e) =>
                    updateStatus(c.id, e.target.value)
                  }
                  className="border p-1 rounded"
                >
                  <option>Pending</option>
                  <option>In Progress</option>
                  <option>Resolved</option>
                </select>
              </td>

              <td className="p-3 text-gray-500">
                {new Date(c.created_at).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {paginated.length === 0 && (
        <div className="p-6 text-center text-gray-500">
          No complaints found
        </div>
      )}
    </div>

    {/* MOBILE CARDS */}
    <div className="md:hidden space-y-4">
      {paginated.map((c) => (
        <div
          key={c.id}
          onClick={() => openComplaintDetails(c)}
          className="bg-white rounded-xl shadow p-4 border cursor-pointer"
        >
          <div className="flex justify-between mb-2">
            <p className="font-semibold">{c.business_name}</p>
            <span className="text-xs text-gray-500">
              {new Date(c.created_at).toLocaleDateString()}
            </span>
          </div>

          <p className="text-blue-600 font-mono mb-1">
            {c.tracking_id}
          </p>

          <p className="text-sm text-gray-600">{c.email}</p>
          <p className="text-sm text-gray-600 mb-2">
            {c.subject}
          </p>

          <select
            value={c.status}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) =>
              updateStatus(c.id, e.target.value)
            }
            className="border p-2 rounded w-full"
          >
            <option>Pending</option>
            <option>In Progress</option>
            <option>Resolved</option>
          </select>
        </div>
      ))}
    </div>

    {/* PAGINATION */}
    <div className="flex justify-center gap-2 mt-6">
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => setPage(i + 1)}
          className={`px-3 py-1 rounded ${
            page === i + 1
              ? "bg-black text-white"
              : "bg-white border"
          }`}
        >
          {i + 1}
        </button>
      ))}
    </div>

    {/* MODAL */}
    {showModal && selectedComplaint && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl p-6 max-w-lg w-full relative">
          <button
            onClick={() => setShowModal(false)}
            className="absolute top-3 right-3 text-xl"
          >
            ×
          </button>

          <h2 className="text-xl font-bold mb-4">
            Complaint Details
          </h2>

          <p><strong>ID:</strong> {selectedComplaint.tracking_id}</p>
          <p><strong>Email:</strong> {selectedComplaint.email}</p>
          <p className="mt-3 text-gray-600">
            {selectedComplaint.description}
          </p>
        </div>
      </div>
    )}
  </div>
);
};

const Card = ({ title, value }) => (
  <div className="bg-white p-4 rounded text-center shadow">
    <p>{title}</p>
    <h2>{value}</h2>
  </div>
);


export default AdminDashboard;