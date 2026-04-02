import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './Profile.css';
import Header from '../Header/Header';

const Profile = () => {
  const { user, signOut } = useAuth();
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.full_name || '',
        email: user.email || '',
        password: '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      let successMessage = '';

      // Update Profile (Name/Email)
      if (formData.fullName !== user.full_name || formData.email !== user.email) {
        const response = await fetch('/api/auth/update-profile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ full_name: formData.fullName, email: formData.email }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Error al actualizar perfil');
        successMessage += 'Perfil actualizado. ';
      }

      // Update Password
      if (formData.password) {
        const response = await fetch('/api/auth/update-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password: formData.password }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Error al actualizar contraseña');
        successMessage += 'Contraseña actualizada. ';
      }

      if (!successMessage) {
        setMessage('No se detectaron cambios.');
      } else {
        setMessage(successMessage.trim());
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setFormData(prev => ({ ...prev, password: '' }));
    }
  };

  const handleCloseSection = async () => {
    try {
      await signOut();
      window.location.href = '/login';
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const handleGoToDashboard = () => {
    window.location.href = '/dashboard';
  };

  return (
    <div className="page-container">
      <Header />
      <main className="main-content-profile">
        <div className="profile-container">
          <div className="profile-form-container">
            <form onSubmit={handleSubmit} className="profile-form-unified">
              <h2>Mi Perfil</h2>
              {message && <p className="message success">{message}</p>}
              {error && <p className="message error">{error}</p>}

              <div className="form-group">
                <label htmlFor="fullName">Nombre Completo</label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Tu nombre completo"
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Correo Electrónico</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Nueva Contraseña</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Dejar en blanco para no cambiar"
                  disabled={loading}
                />
              </div>

              <button type="submit" className="submit-btn-unified" disabled={loading}>
                {loading ? 'Guardando...' : 'Guardar Cambios'}
              </button>
            </form>
          </div>

          <div className="profile-actions">
            <button onClick={handleGoToDashboard} className="action-btn dashboard-btn">
              ← Volver al Dashboard
            </button>
            <button onClick={handleCloseSection} className="action-btn close-btn">
              🚪 Cerrar Sesión
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
