import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import Dashboard from './pages/dashboard/Dashboard';
import FileComplaint from './pages/complaint/FileComplaint';
import TrackComplaints from './pages/complaint/TrackComplaints';
import AdminDashboard from './pages/admin/Admindashboard';
import Brands from './components/brands/brands';

const ProtectedRoute = ({ children, isAuthenticated }) => {
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check token from localStorage
    const token = localStorage.getItem('token');
    
    // Use setTimeout to avoid synchronous setState warning
    setTimeout(() => {
      setIsAuthenticated(!!token);
      setLoading(false);
    }, 0);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />

      {/* Auth Routes */}
      <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Protected Routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <Dashboard />
        </ProtectedRoute>
      } />

      {/* PUBLIC (FIXED) */}
  <Route path="/file-complaint" element={<FileComplaint />} />

      <Route path="/track-complaints" element={
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <TrackComplaints />
        </ProtectedRoute>
      } />

      <Route path="*" element={<Navigate to="/" replace />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/brands" element={<Brands />} />
    </Routes>
  );
};

export default App;