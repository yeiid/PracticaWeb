import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './Auth.css';

function Login({ onSwitchToRegister, onLoginSuccess }) {
  const { signIn, resetPassword } = useAuth();
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
        // Verificar si el email está confirmado
        // En el modo de prueba, no hay `email_confirmed_at`, así que omitimos esta verificación.
        if (data.user && data.user.email_confirmed_at === false) {
          setMessage('Por favor, verifica tu email antes de iniciar sesión.');
          // No es necesario signOut aquí, ya que el usuario no está realmente en la sesión de Supabase.
          return;
        }
        
        setMessage('¡Inicio de sesión exitoso!');
        setTimeout(() => {
          onLoginSuccess(data.user);
        }, 1000);
      }
    } catch (error) {
      setError(error.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
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
          <h1>🚀 Academia Web</h1>
          <h2>Iniciar Sesión</h2>
          <p>Continúa tu viaje de aprendizaje</p>
        </div>

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
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <button
            type="button"
            className="forgot-password-link"
            onClick={handleResetPassword}
            disabled={loading}
          >
            ¿Olvidaste tu contraseña?
          </button>

          <button
            type="submit"
            className="auth-button primary"
            disabled={loading}
          >
            {loading ? '⏳ Iniciando sesión...' : '🚀 Iniciar Sesión'}
          </button>
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
