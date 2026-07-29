import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOffline, setIsOffline] = useState(false);

  // Verificar sesión al cargar
  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      // Si cerramos sesión recientemente, no llamar al API
      if (sessionStorage.getItem('loggedOut')) {
        sessionStorage.removeItem('loggedOut');
        document.cookie = 'session=; max-age=0; path=/';
        setUser(null);
        setLoading(false);
        return;
      }

      const response = await fetch('/api/auth/me');
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setIsOffline(data.isOffline || false);
      } else {
        setUser(null);
        if (response.status === 503 || response.status === 504) {
          setIsOffline(true);
        }
        const demoUser = localStorage.getItem('demo_user');
        if (demoUser) {
          setUser(JSON.parse(demoUser));
          setIsOffline(true);
        }
      }
    } catch (error) {
      console.error('Error verificando sesión:', error);
      setUser(null);
      setIsOffline(true);
      const demoUser = localStorage.getItem('demo_user');
      if (demoUser) {
        setUser(JSON.parse(demoUser));
        setIsOffline(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const signIn = async ({ email, password }) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setUser(data.user);
        setIsOffline(false);
        return { data: { user: data.user }, error: null };
      } else if (response.status === 403 && data.requiresVerification) {
        // Email no verificado
        return {
          data: null,
          error: {
            message: data.error,
            requiresVerification: true,
            email: data.email
          }
        };
      } else {
        return { data: null, error: { message: data.error } };
      }
    } catch (error) {
      return { data: null, error: { message: 'Error de red o base de datos offline' } };
    }
  };

  const signInOffline = (mockUser) => {
    setUser(mockUser);
    setIsOffline(true);
    // Persistir localmente para la sesión actual
    localStorage.setItem('demo_mode', 'true');
    localStorage.setItem('demo_user', JSON.stringify(mockUser));
    return { data: { user: mockUser }, error: null };
  };

  const signUp = async ({ email, password, full_name, tenant_id }) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, full_name, tenant_id }),
      });

      const data = await response.json();
      if (response.ok) {
        // No hacer autologin - requiere verificación de email
        return {
          data: {
            user: data.user,
            requiresVerification: true,
            previewUrl: data.previewUrl
          },
          error: null
        };
      } else {
        return { data: null, error: { message: data.error } };
      }
    } catch (error) {
      return { data: null, error: { message: 'Error de red' } };
    }
  };

  const signOut = async () => {
    localStorage.removeItem('demo_mode');
    localStorage.removeItem('demo_user');
    // Marcar que cerramos sesión para que checkUser no re-autentique
    sessionStorage.setItem('loggedOut', 'true');
    // Limpiar cookie desde el cliente (múltiples variantes)
    document.cookie = 'session=; max-age=0; path=/';
    document.cookie = 'session=; max-age=0; path=/; domain=' + window.location.hostname;
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
    setUser(null);
    window.location.href = '/';
  };

  const resetPassword = async (email) => {
    return { error: null };
  };

  const value = {
    user,
    loading,
    isOffline,
    signIn,
    signInOffline,
    signUp,
    signOut,
    resetPassword,
    checkUser
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};