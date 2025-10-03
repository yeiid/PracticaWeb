import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-container">
      <header className="landing-header">
        <h1>🚀 Academia Web</h1>
        <nav>
          <Link to="/login" className="btn btn-secondary">Iniciar Sesión</Link>
          <Link to="/login" state={{ show: 'register' }} className="btn btn-primary">Registrarse</Link>
        </nav>
      </header>

      <main className="landing-main">
        <div className="hero-section">
          <h2>Aprende Desarrollo Web a tu Ritmo</h2>
          <p>La plataforma definitiva para dominar HTML, CSS, JavaScript y más, con cursos interactivos y seguimiento de tu progreso.</p>
          <Link to="/login" className="btn btn-primary hero-btn">Comienza a Aprender Gratis</Link>
        </div>

        <div className="features-section">
          <h3>¿Por qué elegir Academia Web?</h3>
          <div className="features-grid">
            <div className="feature-card">
              <h4>📚 Cursos Interactivos</h4>
              <p>Lecciones prácticas que te guían paso a paso.</p>
            </div>
            <div className="feature-card">
              <h4>🎯 Seguimiento de Progreso</h4>
              <p>Visualiza tu avance y mantente motivado.</p>
            </div>
            <div className="feature-card">
              <h4>🐍 Contenido Moderno</h4>
              <p>Desde HTML5 hasta Python, todo actualizado.</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="landing-footer">
        <p>&copy; 2024 Academia Web. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
