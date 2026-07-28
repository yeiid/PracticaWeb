import React, { useState, Suspense } from 'react';
import styles from '../ModernCourse.module.css';

const slidesData = [
  { lazy: React.lazy(() => import('./IntroduccionPythonSlide')), title: 'El Lenguaje de la Serpiente' },
  { lazy: React.lazy(() => import('./HistoriaPythonSlide')), title: 'Origen y Evolución' },
  { lazy: React.lazy(() => import('./InstalacionPythonSlide')), title: 'Entorno de Desarrollo' },
  { lazy: React.lazy(() => import('./SintaxisPythonSlide')), title: 'Sintaxis Limpia' },
  { lazy: React.lazy(() => import('./EstructurasPythonSlide')), title: 'Flujo de Ejecución' },
  { lazy: React.lazy(() => import('./FuncionesPythonSlide')), title: 'Modularidad Eficaz' },
  { lazy: React.lazy(() => import('./POO_PythonSlide')), title: 'Programación de Objetos' },
  { lazy: React.lazy(() => import('./LibreriasPythonSlide')), title: 'Ecosistema de Librerías' },
  { lazy: React.lazy(() => import('./HerramientasPythonSlide')), title: 'Herramientas Pro' },
  { lazy: React.lazy(() => import('./CierrePythonSlide')), title: '¡Maestría Pythonista!' }
];

const PythonCourse = ({ onBack }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide < slidesData.length - 1) {
      setCurrentSlide(currentSlide + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
      window.scrollTo(0, 0);
    }
  };

  const CurrentSlideComponent = slidesData[currentSlide].lazy;

  const pythonStyles = {
    '--course-primary': '#10b981',
    '--course-primary-dark': '#059669',
    '--course-accent': 'rgba(16, 185, 129, 0.1)',
    '--course-accent-border': 'rgba(16, 185, 129, 0.2)'
  };

  return (
    <div className={styles.courseContainer} style={pythonStyles}>
      <div className={styles.courseHeader}>
        <button onClick={onBack} className={styles.backButton} aria-label="Volver al panel de cursos">← Volver al Panel</button>
        <h1 className={styles.headerTitle}>🐍 {slidesData[currentSlide].title}</h1>
        <div className={styles.progress}>
          Paso {currentSlide + 1} de {slidesData.length}
        </div>
      </div>

      <div className={styles.slideContainer}>
        <Suspense fallback={<div className={styles.slideLoading}>Cargando diapositiva...</div>}>
          <CurrentSlideComponent />
        </Suspense>
      </div>

      <div className={styles.navigation}>
        <button 
          onClick={prevSlide} 
          disabled={currentSlide === 0}
          className={`${styles.navButton} ${currentSlide === 0 ? styles.disabled : ''}`}
          aria-label="Diapositiva anterior"
        >
          ← Anterior
        </button>
        
        <div className={styles.progressBar}>
          <div 
            className={styles.progressFill} 
            style={{ width: `${((currentSlide + 1) / slidesData.length) * 100}%` }}
          />
        </div>
        
        <button 
          onClick={nextSlide} 
          disabled={currentSlide === slidesData.length - 1}
          className={`${styles.navButton} ${currentSlide === slidesData.length - 1 ? styles.disabled : ''}`}
          aria-label="Siguiente diapositiva"
        >
          {currentSlide === slidesData.length - 1 ? '¡Script Finalizado!' : 'Siguiente Paso →'}
        </button>
      </div>
    </div>
  );
};

export default PythonCourse;
