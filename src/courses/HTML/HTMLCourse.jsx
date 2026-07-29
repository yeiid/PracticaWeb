import React, { useState, Suspense } from 'react';
import styles from '../ModernCourse.module.css';
import { useProgress } from '../../contexts/ProgressContext';

const slidesData = [
  { lazy: React.lazy(() => import('./IntroduccionSlide')), title: 'Introducción a HTML5' },
  { lazy: React.lazy(() => import('./FrontendBackendSlide')), title: 'Frontend vs Backend' },
  { lazy: React.lazy(() => import('./PilaresSlide')), title: 'Los 3 Pilares del Web' },
  { lazy: React.lazy(() => import('./HerramientasSlide')), title: 'Tu Arsenal de Trabajo' },
  { lazy: React.lazy(() => import('./EstructuraHTMLSlide')), title: 'La Columna Vertebral' },
  { lazy: React.lazy(() => import('./EtiquetasSlide')), title: 'Etiquetas Esenciales' },
  { lazy: React.lazy(() => import('./HTMLQuiz')), title: 'Evaluación de HTML5' },
  { lazy: React.lazy(() => import('./CierreSlide')), title: '¡Misión Cumplida!' }
];

const HTMLCourse = ({ onBack, courseId }) => {
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

  const htmlStyles = {
    '--course-primary': '#3498db',
    '--course-primary-dark': '#2980b9',
    '--course-accent': 'rgba(52, 152, 219, 0.1)',
    '--course-accent-border': 'rgba(52, 152, 219, 0.2)'
  };

  return (
    <div className={styles.courseContainer} style={htmlStyles}>
      <div className={styles.courseHeader}>
        <button onClick={onBack} className={styles.backButton} aria-label="Volver al panel de cursos">← Volver al Panel</button>
        <h1 className={styles.headerTitle}>📄 {slidesData[currentSlide].title}</h1>
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
          {currentSlide === slidesData.length - 1 ? '¡Finalizar Cimiento!' : 'Siguiente Paso →'}
        </button>
      </div>
    </div>
  );
};

export default HTMLCourse;
