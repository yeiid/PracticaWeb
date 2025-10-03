import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Auth from './components/Auth/Auth';
import Dashboard from './components/Dashboard/Dashboard';
import ResetPassword from './components/Auth/ResetPassword';
import LandingPage from './components/LandingPage/LandingPage';
import Profile from './components/Profile/Profile';
import HistoryPage from './pages/HistoryPage/HistoryPage';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <h2>Cargando...</h2>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={!user ? <LandingPage /> : <Navigate to="/dashboard" />} />
        <Route path="/login" element={!user ? <Auth /> : <Navigate to="/dashboard" />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/history" element={user ? <HistoryPage /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
