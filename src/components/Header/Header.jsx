import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Sun, Moon, LogIn, LogOut, User, ExternalLink } from 'lucide-react';
import './Header.css';

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>,
  },
  {
    name: 'X / Twitter',
    url: '#',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
  },
  {
    name: 'LinkedIn',
    url: '#',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
  },
  {
    name: 'YouTube',
    url: '#',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>,
  },
];

const Header = () => {
  const { user, signOut } = useAuth();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [currentPath, setCurrentPath] = useState('');
  const [theme, setTheme] = useState('dark');
  const profileRef = useRef(null);
  const drawerRef = useRef(null);

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  useEffect(() => {
    try {
      const t = document.documentElement.getAttribute('data-theme') || localStorage.getItem('theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      setTheme(t);
    } catch (e) {}
  }, []);

  useEffect(() => {
    if (!showMobileMenu) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') setShowMobileMenu(false);
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [showMobileMenu]);

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

  const closeDrawer = () => setShowMobileMenu(false);

  const toggleProfileMenu = () => {
    setShowProfileMenu(prev => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { href: '/dashboard', label: 'Cursos', icon: '📚' },
    { href: '/history', label: 'Historia', icon: '🏛️' },
    { href: '/bases', label: 'Bases', icon: '💻' },
    { href: '/support', label: 'Soporte', icon: '📬' },
  ];

  return (
    <>
    <header className="app-header">
      <a href="/dashboard" className="logo-link">
        <h1>Academia<span style={{color: '#F97316'}}>Web</span></h1>
      </a>

      <nav className="main-nav" aria-label="Navegación principal">
        {navLinks.map(link => (
          <a
            key={link.href}
            href={link.href}
            className={`nav-link ${currentPath === link.href ? 'active' : ''}`}
            aria-current={currentPath === link.href ? 'page' : undefined}
          >
            {link.label}
          </a>
        ))}
        {user?.role === 'admin' && (
          <a
            href="/admin/tickets"
            className={`nav-link admin-link ${currentPath.startsWith('/admin') ? 'active' : ''}`}
            aria-current={currentPath.startsWith('/admin') ? 'page' : undefined}
          >
            Admin
          </a>
        )}
      </nav>

      <div className="header-right">
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Cambiar tema">
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <div className="profile-section" ref={profileRef}>
          {user ? (
            <>
              <div className="profile-avatar" onClick={toggleProfileMenu} role="button" tabIndex={0} aria-label="Menú de perfil">
                {getUserInitials()}
              </div>
              {showProfileMenu && (
                <div className="profile-dropdown">
                  <div className="dropdown-header">
                    <span className="user-email-header">{user?.email}</span>
                  </div>
                  <a href="/profile" className="dropdown-item" onClick={() => setShowProfileMenu(false)}>
                    <User size={16} /> Mi Perfil
                  </a>
                  <button onClick={signOut} className="dropdown-item logout-btn-dropdown">
                    <LogOut size={16} /> Cerrar Sesión
                  </button>
                </div>
              )}
            </>
          ) : (
            <a href="/login" className="login-btn-header" aria-label="Iniciar sesión">
              <LogIn size={18} />
            </a>
          )}
        </div>

        <button
          className={`mobile-menu-btn ${showMobileMenu ? 'active' : ''}`}
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          aria-label={showMobileMenu ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={showMobileMenu}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </div>

      {showMobileMenu && (
        <div className="drawer-overlay" onClick={closeDrawer} aria-hidden="true" />
      )}

      <aside
        className={`mobile-drawer ${showMobileMenu ? 'drawer-open' : ''}`}
        ref={drawerRef}
        aria-label="Menú de navegación móvil"
        role="dialog"
        aria-modal="true"
      >
        <div className="drawer-header">
          <span className="drawer-logo">Academia<span>Web</span></span>
          <button className="drawer-close" onClick={closeDrawer} aria-label="Cerrar menú">✕</button>
        </div>

        <nav className="drawer-nav" aria-label="Enlaces de navegación">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className={`drawer-nav-link ${currentPath === link.href ? 'drawer-active' : ''}`}
              onClick={closeDrawer}
              aria-current={currentPath === link.href ? 'page' : undefined}
            >
              <span className="drawer-nav-icon">{link.icon}</span>
              <span>{link.label}</span>
            </a>
          ))}
          {user?.role === 'admin' && (
            <a
              href="/admin/tickets"
              className={`drawer-nav-link ${currentPath.startsWith('/admin') ? 'drawer-active' : ''}`}
              onClick={closeDrawer}
              aria-current={currentPath.startsWith('/admin') ? 'page' : undefined}
            >
              <span className="drawer-nav-icon">🛡️</span>
              <span>Admin</span>
            </a>
          )}
        </nav>

        <div className="drawer-divider" />

        <div className="drawer-actions">
          <button className="drawer-action-btn" onClick={toggleTheme}>
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            <span>Modo {theme === 'dark' ? 'Claro' : 'Oscuro'}</span>
          </button>

          {user ? (
            <div className="drawer-user">
              <div className="drawer-user-info">
                <div className="drawer-avatar">{getUserInitials()}</div>
                <div className="drawer-user-text">
                  <span className="drawer-user-email">{user.email}</span>
                  <span className="drawer-user-role">{user.role === 'admin' ? 'Administrador' : 'Estudiante'}</span>
                </div>
              </div>
              <div className="drawer-user-actions">
                <a href="/profile" className="drawer-action-btn" onClick={closeDrawer}>
                  <User size={16} /> <span>Mi Perfil</span>
                </a>
                <button className="drawer-action-btn drawer-logout" onClick={signOut}>
                  <LogOut size={16} /> <span>Cerrar Sesión</span>
                </button>
              </div>
            </div>
          ) : (
            <a href="/login" className="drawer-login-btn" onClick={closeDrawer}>
              <LogIn size={18} />
              <span>Iniciar Sesión</span>
            </a>
          )}
        </div>

        <div className="drawer-divider" />

        <div className="drawer-social">
          <span className="drawer-social-label">Síguenos</span>
          <div className="drawer-social-links">
            {socialLinks.map(social => (
              <a
                key={social.name}
                href={social.url}
                className="drawer-social-link"
                aria-label={social.name}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeDrawer}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </aside>
    </header>

    <nav className="mobile-bottom-nav" aria-label="Navegación móvil">
      {navLinks.map(link => (
        <a
          key={link.href}
          href={link.href}
          className={`mobile-nav-link ${currentPath === link.href ? 'mobile-active' : ''}`}
          aria-current={currentPath === link.href ? 'page' : undefined}
        >
          {link.icon} {link.label}
        </a>
      ))}
      {user?.role === 'admin' && (
        <a
          href="/admin/tickets"
          className={`mobile-nav-link ${currentPath.startsWith('/admin') ? 'mobile-active' : ''}`}
          aria-current={currentPath.startsWith('/admin') ? 'page' : undefined}
        >
          🛡️ Admin
        </a>
      )}
    </nav>
    </>
  );
};

export default Header;
