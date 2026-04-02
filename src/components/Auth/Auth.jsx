import React, { useState, useEffect } from 'react';
import Login from './Login';
import Register from './Register';

function Auth({ isDBOffline }) {
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('mode') === 'register') {
      setShowLogin(false);
    }
  }, []);

  const handleLoginSuccess = (user) => {
    console.log('Login exitoso para:', user.email);
  };

  if (showLogin) {
    return (
      <Login 
        onSwitchToRegister={() => setShowLogin(false)} 
        onLoginSuccess={handleLoginSuccess} 
        isDBOffline={isDBOffline}
      />
    );
  }

  return <Register onSwitchToLogin={() => setShowLogin(true)} isDBOffline={isDBOffline} />;
}

export default Auth;
