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

  // Verificar variables de entorno
  const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
  const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        padding: '20px',
        textAlign: 'center',
        backgroundColor: '#f5f5f5'
      }}>
        <h1 style={{ color: '#e74c3c' }}>⚠️ Error de Configuración</h1>
        <p style={{ fontSize: '18px', maxWidth: '600px', marginTop: '20px' }}>
          Las variables de entorno de Supabase no están configuradas en Vercel.
        </p>
        <div style={{ 
          backgroundColor: 'white', 
          padding: '20px', 
          borderRadius: '8px', 
          marginTop: '20px',
          textAlign: 'left',
          maxWidth: '700px'
        }}>
          <h3>📋 Variables requeridas:</h3>
          <ul style={{ lineHeight: '2' }}>
            <li>
              <strong>REACT_APP_SUPABASE_URL:</strong> {supabaseUrl ? '✅' : '❌ Falta'}
            </li>
            <li>
              <strong>REACT_APP_SUPABASE_ANON_KEY:</strong> {supabaseAnonKey ? '✅' : '❌ Falta'}
            </li>
          </ul>
          <h3 style={{ marginTop: '20px' }}>🔧 Solución:</h3>
          <ol style={{ lineHeight: '2' }}>
            <li>Ve a Vercel Dashboard → Settings → Environment Variables</li>
            <li>Agrega las variables faltantes</li>
            <li>Re-despliega el proyecto</li>
          </ol>
        </div>
      </div>
    );
  }

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
        <Route path="/history" element={<HistoryPage />} />
      </Routes>
    </Router>
  );
}

export default App;
