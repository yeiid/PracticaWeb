import React, { useState, Suspense } from 'react';
import styles from '../ModernCourse.module.css';

const slidesData = [
  { lazy: React.lazy(() => import('./IntroduccionReactSlide').then(m => ({ default: m.IntroduccionReactSlide }))), title: 'La Revolución de las UI' },
  { lazy: React.lazy(() => import('./ComponentesSlide').then(m => ({ default: m.ComponentesSlide }))), title: 'Pensando en Componentes' },
  { lazy: React.lazy(() => import('./PropsStateSlide').then(m => ({ default: m.PropsStateSlide }))), title: 'Controlando el Estado' }
];

const ReactCourse = ({ onBack }) => {
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

  const reactStyles = {
    '--course-primary': '#06b6d4',
    '--course-primary-dark': '#0891b2',
    '--course-accent': 'rgba(6, 182, 212, 0.1)',
    '--course-accent-border': 'rgba(6, 182, 212, 0.2)'
  };

  return (
    <div className={styles.courseContainer} style={reactStyles}>
      <div className={styles.courseHeader}>
        <button onClick={onBack} className={styles.backButton} aria-label="Volver al panel de cursos">← Volver al Panel</button>
        <h1 className={styles.headerTitle}>⚛️ {slidesData[currentSlide].title}</h1>
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
          {currentSlide === slidesData.length - 1 ? '¡Componente List!' : 'Siguiente Paso →'}
        </button>
      </div>
    </div>
  );
};

export default ReactCourse;
