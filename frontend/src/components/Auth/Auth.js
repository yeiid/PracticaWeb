import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

import { useLocation } from 'react-router-dom';

function Auth() {
  const location = useLocation();
  const [showLogin, setShowLogin] = useState(location.state?.show !== 'register');

  const handleLoginSuccess = (user) => {
    // La redirección se maneja en App.js, aquí solo podrías
    // hacer algo adicional si fuera necesario.
    console.log('Login exitoso para:', user.email);
  };

  if (showLogin) {
    return <Login onSwitchToRegister={() => setShowLogin(false)} onLoginSuccess={handleLoginSuccess} />;
  }

  return <Register onSwitchToLogin={() => setShowLogin(true)} />;
}

export default Auth;
