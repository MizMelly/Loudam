import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const PAGE_SIZE = 8;

const AdminDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState("");
  const [businessSearch, setBusinessSearch] = useState("");
  const [trackingSearch, setTrackingSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
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
        statusFilter === "All" || c.status === statusFilter;

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
    <div className="min-h-screen p-4 sm:p-6 bg-linear-to-br from-slate-300 via-blue-150 to-indigo-300">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <h1 className="text-2xl sm:text-3xl font-bold">
          Admin Dashboard
        </h1>

        <button
          onClick={handleLogout}
          className="bg-white border border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-4 py-2 rounded-xl transition w-full sm:w-auto"
        >
          Logout
        </button>
      </div>

      {/* ANALYTICS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <Card title="Total" value={stats.total} />
        <Card title="Pending" value={stats.pending} />
        <Card title="In Progress" value={stats.inProgress} />
        <Card title="Resolved %" value={`${resolvedPercent}%`} />
      </div>

      {/* SEARCH */}
      <div className="flex flex-col md:flex-row gap-3 mb-4">

        <input
          className="w-full p-2 border rounded"
          placeholder="Search email, subject..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        <input
          className="w-full p-2 border rounded"
          placeholder="Search business..."
          value={businessSearch}
          onChange={(e) => {
            setBusinessSearch(e.target.value);
            setPage(1);
          }}
        />

        <input
          className="w-full p-2 border rounded"
          placeholder="Search tracking ID..."
          value={trackingSearch}
          onChange={(e) => {
            setTrackingSearch(e.target.value);
            setPage(1);
          }}
        />

        <select
          className="w-full md:w-auto p-2 border rounded"
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
        >
          <option>All</option>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Resolved</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="hidden md:block bg-white/90 shadow rounded-xl overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">Tracking ID</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Business</th>
              <th className="p-3 text-left">Subject</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Date</th>
            </tr>
          </thead>

          <tbody>
            {paginated.map((c) => (
              <tr key={c.id} className="border-b hover:bg-gray-50">

                <td
                  className="p-3 font-mono text-blue-600 cursor-pointer hover:underline"
                  onClick={() => setTrackingSearch(c.tracking_id)}
                >
                  {c.tracking_id}
                </td>

                <td className="p-3">{c.email}</td>
                <td className="p-3 font-medium">{c.business_name}</td>
                <td className="p-3">{c.subject}</td>

                <td className="p-3">
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

                <td className="p-3 text-sm text-gray-600">
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

      {/* MOBILE */}
      <div className="md:hidden space-y-3">
        {paginated.map((c) => (
          <div key={c.id} className="bg-white rounded-xl shadow p-4 border">

            <div className="flex justify-between mb-2">
              <p className="font-semibold text-sm">
                {c.business_name}
              </p>
              <span className="text-xs text-gray-500">
                {new Date(c.created_at).toLocaleDateString()}
              </span>
            </div>

            <p className="text-sm text-blue-600 font-mono mb-1">
              {c.tracking_id}
            </p>

            <p className="text-sm text-gray-600">Email: {c.email}</p>
            <p className="text-sm text-gray-600 mb-2">
              Subject: {c.subject}
            </p>

            <select
              value={c.status}
              onChange={(e) =>
                updateStatus(c.id, e.target.value)
              }
              className="border p-1 rounded text-sm w-full"
            >
              <option>Pending</option>
              <option>In Progress</option>
              <option>Resolved</option>
            </select>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="flex flex-wrap justify-center gap-2 mt-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded border ${
              page === i + 1
                ? "bg-black text-white"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

// 📦 CARD
const Card = ({ title, value }) => (
  <div className="bg-white p-3 sm:p-4 shadow rounded-xl border text-center">
    <p className="text-gray-500 text-sm">{title}</p>
    <p className="text-xl sm:text-2xl font-bold">{value}</p>
  </div>
);

export default AdminDashboard;