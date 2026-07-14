import React from 'react';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-container">
      <div className="bg-glow bg-glow-1"></div>
      <div className="bg-glow bg-glow-2"></div>
      <div className="bg-grid"></div>

      <header className="landing-header">
        <div className="logo">
          <span className="logo-text">Academia<span>Web</span></span>
        </div>
        <nav className="landing-nav">
          <a href="/login" className="nav-link">Cursos</a>
          <a href="/login" className="btn btn-secondary">Entrar</a>
          <a href="/login?mode=register" className="btn btn-primary">Empezar Gratis</a>
        </nav>
      </header>

      <main className="landing-main">
        <section className="hero-section">
          <div className="badge">
            <span className="pulse-dot"></span>
            Plataforma de Aprendizaje
          </div>
          <h1 className="hero-title">
            Domina el <span className="text-gradient">Desarrollo Web</span> <br />
            desde Cero hasta Pro
          </h1>
          <p className="hero-description">
            La plataforma definitiva con lecciones interactivas, visualizaciones 3D 
            y proyectos reales. Aprende con la infraestructura más moderna.
          </p>
          <div className="hero-actions">
            <a href="/login?mode=register" className="btn btn-primary hero-btn">Comienza ahora</a>
            <a href="#features" className="btn btn-secondary hero-btn">Ver Cursos</a>
          </div>
        </section>

        <section id="features" className="features-section">
          <h2 className="section-title">¿Por qué elegir Academia Web?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📚</div>
              <h4>Lecciones Interactivas</h4>
              <p>No solo leas, practica en tiempo real con nuestro editor integrado.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h4>Seguimiento Real</h4>
              <p>Tu progreso se guarda automáticamente en la nube.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🚀</div>
              <h4>Git & Devops</h4>
              <p>Nuevo curso de Git incluido para dominar el despliegue profesional.</p>
            </div>
          </div>
        </section>

        <section className="history-section">
          <h2 className="section-title">Experiencias Inmersivas</h2>
          <div className="history-timeline">
            <div className="history-item">
              <div className="history-year">1991</div>
              <h4>El Inicio</h4>
              <p>Explora el nacimiento de la WWW con Tim Berners-Lee.</p>
              <a href="/history" className="btn-link">Explorar en 3D →</a>
            </div>
            <div className="history-item">
              <div className="history-year">Git</div>
              <h4>Git Master</h4>
              <p>Domina el control de versiones con visualizaciones interactivas de ramas.</p>
              <a href="/git" className="btn-link">Ver Curso →</a>
            </div>
            <div className="history-item">
              <div className="history-year">2026</div>
              <h4>Web Moderna</h4>
              <p>Despliegue automático y microservicios modernos.</p>
              <a href="/backend" className="btn-link">Explorar →</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <div className="footer-content">
          <p>© 2026 Academia Web. Desarrollado para el futuro.</p>
          <div className="footer-links">
            <a href="#">Privacidad</a>
            <a href="#">Términos</a>
            <a href="#">Contacto</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
