import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Header.css';

const Header = () => {
  const { user, signOut } = useAuth();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef(null);

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
      <Link to="/dashboard" className="logo-link">
        <h1>🚀 Academia Web</h1>
      </Link>

      <button className={`mobile-menu-btn ${showMobileMenu ? 'active' : ''}`} onClick={toggleMobileMenu}>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </button>

      <nav className={`main-nav ${showMobileMenu ? 'mobile-menu-open' : ''}`}>
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={() => setShowMobileMenu(false)}>Cursos</NavLink>
        <NavLink to="/history" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={() => setShowMobileMenu(false)}>Historia</NavLink>
      </nav>

      <div className="header-right">
        <div className="profile-section" ref={profileRef}>
          <div className="profile-avatar" onClick={toggleProfileMenu}>
            {getUserInitials()}
          </div>

          {showProfileMenu && (
            <div className="profile-dropdown">
              <div className="dropdown-header">
                <span className="user-email-header">{user?.email}</span>
              </div>
              <Link to="/profile" className="dropdown-item" onClick={() => setShowProfileMenu(false)}>
                Mi Perfil
              </Link>
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
