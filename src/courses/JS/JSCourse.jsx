import React, { useState, Suspense } from 'react';
import styles from '../ModernCourse.module.css';
import { useProgress } from '../../contexts/ProgressContext';

const slidesData = [
  { lazy: React.lazy(() => import('./IntroduccionJSSlide')), title: 'El Motor de la Web' },
  { lazy: React.lazy(() => import('./VariablesJSSlide')), title: 'Datos y Almacenamiento' },
  { lazy: React.lazy(() => import('./OperadoresJSSlide')), title: 'Operadores Lógicos' },
  { lazy: React.lazy(() => import('./EstructurasJSSlide')), title: 'Control del Flujo' },
  { lazy: React.lazy(() => import('./FuncionesJSSlide')), title: 'El Poder de las Funciones' },
  { lazy: React.lazy(() => import('./ObjetosJSSlide')), title: 'Modelando la Realidad' },
  { lazy: React.lazy(() => import('./ArraysJSSlide')), title: 'Colecciones de Datos' },
  { lazy: React.lazy(() => import('./DOMJSSlide')), title: 'Interactuando con la Web' },
  { lazy: React.lazy(() => import('./EventosJSSlide')), title: 'Capturando Acciones' },
  { lazy: React.lazy(() => import('./ES6JSSlide')), title: 'JavaScript Moderno ES6+' },
  { lazy: React.lazy(() => import('./CierreJSSlide')), title: '¡Maestría Alcanzada!' }
];

const JSCourse = ({ onBack, courseId }) => {
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

  const jsStyles = {
    '--course-primary': '#facc15',
    '--course-primary-dark': '#ca8a04',
    '--course-accent': 'rgba(250, 204, 21, 0.1)',
    '--course-accent-border': 'rgba(250, 204, 21, 0.2)'
  };

  return (
    <div className={styles.courseContainer} style={jsStyles}>
      <div className={styles.courseHeader}>
        <button onClick={onBack} className={styles.backButton} aria-label="Volver al panel de cursos">← Volver al Panel</button>
        <h1 className={styles.headerTitle}>⚡ {slidesData[currentSlide].title}</h1>
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
          {currentSlide === slidesData.length - 1 ? '¡Motor Encendido!' : 'Siguiente Paso →'}
        </button>
      </div>
    </div>
  );
};

export default JSCourse;
