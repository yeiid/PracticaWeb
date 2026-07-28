import React, { useState, Suspense } from 'react';
import styles from '../ModernCourse.module.css';

const slidesData = [
  { lazy: React.lazy(() => import('./IntroduccionCSSSlide')), title: 'Introducción a CSS3' },
  { lazy: React.lazy(() => import('./SelectoresCSSSlide')), title: 'Selectores y Cascada' },
  { lazy: React.lazy(() => import('./ModeloCajaSlide')), title: 'El Modelo de Caja' },
  { lazy: React.lazy(() => import('./FlexboxSlide')), title: 'Flexbox Magic' },
  { lazy: React.lazy(() => import('./GridSlide')), title: 'CSS Grid Layout' },
  { lazy: React.lazy(() => import('./ResponsiveSlide')), title: 'Diseño Responsivo' },
  { lazy: React.lazy(() => import('./AnimacionesSlide')), title: 'Animaciones y Transiciones' },
  { lazy: React.lazy(() => import('./BuenasPracticasSlide')), title: 'Arquitectura y Clean CSS' }
];

const CSSCourse = ({ onBack }) => {
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

  const cssStyles = {
    '--course-primary': '#0ea5e9',
    '--course-primary-dark': '#0284c7',
    '--course-accent': 'rgba(14, 165, 233, 0.1)',
    '--course-accent-border': 'rgba(14, 165, 233, 0.2)'
  };

  return (
    <div className={styles.courseContainer} style={cssStyles}>
      <div className={styles.courseHeader}>
        <button onClick={onBack} className={styles.backButton} aria-label="Volver al panel de cursos">← Volver al Panel</button>
        <h1 className={styles.headerTitle}>🎨 {slidesData[currentSlide].title}</h1>
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
          {currentSlide === slidesData.length - 1 ? '¡Estilo Dominado!' : 'Siguiente Paso →'}
        </button>
      </div>
    </div>
  );
};

export default CSSCourse;
