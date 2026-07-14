import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './Header.css';

const Header = () => {
  const { user, signOut } = useAuth();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [currentPath, setCurrentPath] = useState('');
  const [theme, setTheme] = useState('dark');
  const profileRef = useRef(null);

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  useEffect(() => {
    try {
      const t = document.documentElement.getAttribute('data-theme') || localStorage.getItem('theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      setTheme(t);
    } catch (e) {}
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    try {
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    } catch (e) {}
    setTheme(newTheme);
  };

  const getUserInitials = () => {
    if (!user?.email) return 'U';
    return user.email.charAt(0).toUpperCase();
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(prev => !prev);
  };

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="app-header">
      <a href="/dashboard" className="logo-link">
        <h1>Academia<span style={{color: '#F97316'}}>Web</span></h1>
      </a>

      <button className={`mobile-menu-btn ${showMobileMenu ? 'active' : ''}`} onClick={toggleMobileMenu}>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </button>

      <nav className={`main-nav ${showMobileMenu ? 'mobile-menu-open' : ''}`}>
        <a href="/dashboard" className={`nav-link ${currentPath === '/dashboard' ? 'active' : ''}`} onClick={() => setShowMobileMenu(false)}>Cursos</a>
        <a href="/history" className={`nav-link ${currentPath === '/history' ? 'active' : ''}`} onClick={() => setShowMobileMenu(false)}>Historia</a>
        <a href="/bases" className={`nav-link ${currentPath === '/bases' ? 'active' : ''}`} onClick={() => setShowMobileMenu(false)}>Bases</a>
        <a href="/support" className={`nav-link ${currentPath === '/support' ? 'active' : ''}`} onClick={() => setShowMobileMenu(false)}>Soporte</a>
        {user?.role === 'admin' && (
          <a href="/admin/tickets" className={`nav-link admin-link ${currentPath.startsWith('/admin') ? 'active' : ''}`} onClick={() => setShowMobileMenu(false)}>🛡️ Admin</a>
        )}
      </nav>

      <div className="header-right">
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Cambiar tema">
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
        <div className="profile-section" ref={profileRef}>
          <div className="profile-avatar" onClick={toggleProfileMenu}>
            {getUserInitials()}
          </div>

          {showProfileMenu && (
            <div className="profile-dropdown">
              <div className="dropdown-header">
                <span className="user-email-header">{user?.email}</span>
              </div>
              <a href="/profile" className="dropdown-item" onClick={() => setShowProfileMenu(false)}>
                Mi Perfil
              </a>
              <button onClick={signOut} className="dropdown-item logout-btn-dropdown">
                Cerrar Sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

