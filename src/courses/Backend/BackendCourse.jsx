import React, { useState, Suspense } from 'react';
import styles from '../ModernCourse.module.css';
import { useProgress } from '../../contexts/ProgressContext';

const slidesData = [
  { lazy: React.lazy(() => import('./IntroduccionBackendSlide').then(m => ({ default: m.IntroduccionBackendSlide }))), title: 'El Corazón del Sistema' },
  { lazy: React.lazy(() => import('./NodeJSSlide').then(m => ({ default: m.NodeJSSlide }))), title: 'Node.js y el V8 Engine' },
  { lazy: React.lazy(() => import('./ExpressSlide').then(m => ({ default: m.ExpressSlide }))), title: 'Servidores con Express.js' },
  { lazy: React.lazy(() => import('./APIRestSlide').then(m => ({ default: m.APIRestSlide }))), title: 'Diseño de APIs REST' },
  { lazy: React.lazy(() => import('./BaseDeDatosSlide').then(m => ({ default: m.BaseDeDatosSlide }))), title: 'Persistencia de Datos' },
  { lazy: React.lazy(() => import('./AutenticacionSlide').then(m => ({ default: m.AutenticacionSlide }))), title: 'Seguridad y JWT' },
  { lazy: React.lazy(() => import('./DespliegueBackendSlide').then(m => ({ default: m.DespliegueBackendSlide }))), title: 'Hacia la Nube' }
];

const BackendCourse = ({ onBack = () => {}, courseId }) => {
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

  const backendStyles = {
    '--course-primary': '#ec4899',
    '--course-primary-dark': '#db2777',
    '--course-accent': 'rgba(236, 72, 153, 0.1)',
    '--course-accent-border': 'rgba(236, 72, 153, 0.2)'
  };

  return (
    <div className={styles.courseContainer} style={backendStyles}>
      <div className={styles.courseHeader}>
        <button onClick={onBack} className={styles.backButton} aria-label="Volver al panel de cursos">← Volver al Panel</button>
        <h1 className={styles.headerTitle}>⚙️ {slidesData[currentSlide].title}</h1>
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
          {currentSlide === slidesData.length - 1 ? '¡Backend Operativo!' : 'Siguiente Paso →'}
        </button>
      </div>
    </div>
  );
};

export default BackendCourse;
