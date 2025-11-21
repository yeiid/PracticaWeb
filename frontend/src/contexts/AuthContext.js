import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { supabase } from '../config/supabase';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  console.log('DEBUG: REACT_APP_USE_MOCK_AUTH =', process.env.REACT_APP_USE_MOCK_AUTH);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const mockUser = useMemo(() => ({
    id: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
    email: 'test.user@example.com',
    user_metadata: { full_name: 'Usuario de Prueba' },
  }), []);

  useEffect(() => {
    if (process.env.REACT_APP_USE_MOCK_AUTH === 'true') {
      setUser(mockUser);
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription?.unsubscribe();
  }, [mockUser]);

  const signIn = async ({ email, password }) => {
    if (process.env.REACT_APP_USE_MOCK_AUTH === 'true') {
      console.log('Simulating sign in...');
      setUser(mockUser);
      return { data: { user: mockUser }, error: null };
    }
    return supabase.auth.signInWithPassword({ email, password });
  };

  const resetPassword = async (email) => {
    if (process.env.REACT_APP_USE_MOCK_AUTH === 'true') {
      console.log(`Simulating password reset for ${email}`);
      return { error: null };
    }
    return supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
  };

  const signOut = async () => {
    if (process.env.REACT_APP_USE_MOCK_AUTH === 'true') {
      console.log('Simulating sign out...');
      setUser(null);
      return;
    }
    await supabase.auth.signOut();
    setUser(null);
  };

  const value = {
    user,
    loading,
    signIn,
    signOut,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
