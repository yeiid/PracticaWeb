import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Header.css';

const Header = () => {
  const { user, signOut } = useAuth();

  return (
    <header className="app-header">
      <Link to="/dashboard" className="logo-link">
        <h1>🚀 Academia Web</h1>
      </Link>
      <nav className="main-nav">
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Cursos</NavLink>
        <NavLink to="/profile" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Mi Perfil</NavLink>
        <NavLink to="/history" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Historia</NavLink>
        {/* Añadir más enlaces aquí en el futuro */}
      </nav>
      <div className="header-right">
        <span className="user-email-header">{user?.email}</span>
        <button onClick={signOut} className="logout-btn">Cerrar Sesión</button>
      </div>
    </header>
  );
};

export default Header;
