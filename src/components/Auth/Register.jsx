import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './Auth.css';

function Register({ onSwitchToLogin, isDBOffline }) {
  const { signUp } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return false;
    }

    if (!formData.fullName.trim()) {
      setError('Por favor ingresa tu nombre completo');
      return false;
    }

    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    setLoading(true);

    try {
      const { data, error } = await signUp({
        email: formData.email,
        password: formData.password,
        full_name: formData.fullName
      });

      if (error) throw new Error(error.message);

      if (data) {
        setRegisteredEmail(formData.email);
        setPreviewUrl(data.previewUrl || '');
        setSuccess(true);
        setFormData({
          email: '',
          password: '',
          confirmPassword: '',
          fullName: '',
        });
      }
    } catch (error) {
      setError(error.message || 'Error al registrar usuario');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <div className="success-icon">📧</div>
            <h2>¡Cuenta Creada!</h2>
            <p className="success-message">
              Tu cuenta <strong>{registeredEmail}</strong> fue creada exitosamente.
            </p>
            <div className="verification-box">
              <div className="verification-icon">✉️</div>
              <h3>Verifica tu correo</h3>
              <p className="success-submessage">
                Te hemos enviado un email de confirmación. 
                Revisa tu bandeja de entrada y haz clic en el enlace para activar tu cuenta.
              </p>
              {previewUrl && (
                <p className="preview-note">
                  📬 Modo desarrollo: <a href={previewUrl} target="_blank" rel="noopener noreferrer">Ver email de prueba</a>
                </p>
              )}
            </div>
          </div>

          <button
            className="auth-button primary"
            onClick={onSwitchToLogin}
          >
            Ir a Iniciar Sesión
          </button>
        </div>

        <div className="auth-background">
          <div className="floating-shape shape-1"></div>
          <div className="floating-shape shape-2"></div>
          <div className="floating-shape shape-3"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Academia<span style={{color: '#F97316'}}>Web</span></h1>
          <h2>Crear Cuenta</h2>
          <p>Comienza tu viaje de aprendizaje hoy</p>
        </div>

        <form onSubmit={handleRegister} className="auth-form">
          {error && <div className="auth-error">{error}</div>}

          <div className="form-group">
            <label htmlFor="fullName">
              <span className="label-icon">👤</span>
              Nombre Completo
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Juan Pérez"
              value={formData.fullName}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">
              <span className="label-icon">📧</span>
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="tu@email.com"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              <span className="label-icon">🔒</span>
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Mínimo 6 caracteres"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading}
              minLength={6}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">
              <span className="label-icon">🔐</span>
              Confirmar Contraseña
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Repite tu contraseña"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="auth-button primary"
            disabled={loading}
          >
            {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            ¿Ya tienes cuenta?{' '}
            <button
              className="switch-auth-link"
              onClick={onSwitchToLogin}
              disabled={loading}
            >
              Inicia sesión aquí
            </button>
          </p>
        </div>
      </div>

      <div className="auth-background">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
      </div>
    </div>
  );
}

export default Register;