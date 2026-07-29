import React, { useState, Suspense } from 'react';
import styles from '../ModernCourse.module.css';
import { useProgress } from '../../contexts/ProgressContext';

const slidesData = [
  { lazy: React.lazy(() => import('./Slides/Day1').then(m => ({ default: m.Day1 }))), title: 'Día 1: Los Cimientos' },
  { lazy: React.lazy(() => import('./Slides/Day2').then(m => ({ default: m.Day2 }))), title: 'Día 2: Viaje en el Tiempo' },
  { lazy: React.lazy(() => import('./Slides/Day3').then(m => ({ default: m.Day3 }))), title: 'Día 3: Universos Paralelos' },
  { lazy: React.lazy(() => import('./Slides/Day4').then(m => ({ default: m.Day4 }))), title: 'Día 4: Resolución de Conflictos' },
  { lazy: React.lazy(() => import('./Slides/Day5').then(m => ({ default: m.Day5 }))), title: 'Día 5: El Puente al Mundo' },
  { lazy: React.lazy(() => import('./Slides/Day6').then(m => ({ default: m.Day6 }))), title: 'Día 6: Herramientas de Poder' },
  { lazy: React.lazy(() => import('./Slides/Day7').then(m => ({ default: m.Day7 }))), title: 'Día 7: Flujo Profesional' }
];

const GitCourse = ({ onBack, courseId }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { markSlideCompleted } = useProgress();

  const nextSlide = () => {
    if (currentSlide < slidesData.length - 1) {
      setCurrentSlide(currentSlide + 1);
      window.scrollTo(0, 0);
      markSlideCompleted(courseId, slidesData.length);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
      window.scrollTo(0, 0);
    }
  };

  const CurrentSlideComponent = slidesData[currentSlide].lazy;

  const gitStyles = {
    '--course-primary': '#f97316',
    '--course-primary-dark': '#ea580c',
    '--course-accent': 'rgba(249, 115, 22, 0.1)',
    '--course-accent-border': 'rgba(249, 115, 22, 0.2)'
  };

  return (
    <div className={styles.courseContainer} style={gitStyles}>
      <div className={styles.courseHeader}>
        <button onClick={onBack} className={styles.backButton} aria-label="Volver al panel de cursos">← Volver al Panel</button>
        <h1 className={styles.headerTitle}>🧡 {slidesData[currentSlide].title}</h1>
        <div className={styles.progress}>
          Día {currentSlide + 1} de {slidesData.length}
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
          {currentSlide === slidesData.length - 1 ? '¡Meta Alcanzada!' : 'Siguiente Paso →'}
        </button>
      </div>
    </div>
  );
};

export default GitCourse;
