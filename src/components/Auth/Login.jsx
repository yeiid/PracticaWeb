import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { mockUser } from '../../lib/mockData';
import './Auth.css';

function Login({ onSwitchToRegister, onLoginSuccess, isDBOffline }) {
  const { signIn, signInOffline, resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const { data, error } = await signIn({ email, password });

      if (error) throw error;

      if (data.user) {
        setMessage('¡Inicio de sesión exitoso!');
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1000);
      }
    } catch (error) {
      setError(error.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setLoading(true);
    const { data } = signInOffline(mockUser);
    setMessage('¡Entrando en Modo Demo!');
    setTimeout(() => {
      window.location.href = '/dashboard';
    }, 1000);
  };

  const handleResetPassword = async () => {
    if (!email) {
      setError('Por favor ingresa tu email para restablecer la contraseña');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { error } = await resetPassword(email);
      if (error) throw error;
      setMessage('Se ha enviado un email para restablecer tu contraseña. (En modo de prueba, esto es una simulación)');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Academia<span style={{color: '#F97316'}}>Web</span></h1>
          <h2>Iniciar Sesión</h2>
          <p>Continúa tu viaje de aprendizaje</p>
        </div>

        {isDBOffline && (
          <div className="db-offline-warning">
            <span className="warning-icon">⚠️</span>
            <div className="warning-content">
              <strong>Base de datos desconectada</strong>
              <p>No se puede conectar al servidor. Puedes entrar en modo demostración para ver la interfaz.</p>
            </div>
          </div>
        )}

        <form onSubmit={handleLogin} className="auth-form">
          {error && <div className="auth-error">{error}</div>}
          {message && <div className="auth-success">{message}</div>}

          <div className="form-group">
            <label htmlFor="email">
              <span className="label-icon">📧</span>
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading || isDBOffline}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              <span className="label-icon">🔒</span>
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading || isDBOffline}
            />
          </div>

          <button
            type="button"
            className="forgot-password-link"
            onClick={handleResetPassword}
            disabled={loading || isDBOffline}
          >
            ¿Olvidaste tu contraseña?
          </button>

          <button
            type="submit"
            className="auth-button primary"
            disabled={loading || isDBOffline}
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>

          {isDBOffline && (
            <button
              type="button"
              className="auth-button secondary demo-btn"
              onClick={handleDemoLogin}
              disabled={loading}
            >
              Entrar en Modo Demo
            </button>
          )}
        </form>

        <div className="auth-footer">
          <p>
            ¿No tienes cuenta?{' '}
            <button
              className="switch-auth-link"
              onClick={onSwitchToRegister}
              disabled={loading}
            >
              Regístrate aquí
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

export default Login;
