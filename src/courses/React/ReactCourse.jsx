import React, { useState } from 'react';
import { IntroduccionReactSlide } from './IntroduccionReactSlide';
import { ComponentesSlide } from './ComponentesSlide';
import { PropsStateSlide } from './PropsStateSlide';
import styles from '../ModernCourse.module.css';

const ReactCourse = ({ onBack }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { component: IntroduccionReactSlide, title: 'La Revolución de las UI' },
    { component: ComponentesSlide, title: 'Pensando en Componentes' },
    { component: PropsStateSlide, title: 'Controlando el Estado' }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
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

  const CurrentSlideComponent = slides[currentSlide].component;

  // Estilos específicos para React (Cyan)
  const reactStyles = {
    '--course-primary': '#06b6d4',
    '--course-primary-dark': '#0891b2',
    '--course-accent': 'rgba(6, 182, 212, 0.1)',
    '--course-accent-border': 'rgba(6, 182, 212, 0.2)'
  };

  return (
    <div className={styles.courseContainer} style={reactStyles}>
      <div className={styles.courseHeader}>
        <button onClick={onBack} className={styles.backButton}>← Volver al Panel</button>
        <h1 className={styles.headerTitle}>⚛️ {slides[currentSlide].title}</h1>
        <div className={styles.progress}>
          Paso {currentSlide + 1} de {slides.length}
        </div>
      </div>

      <div className={styles.slideContainer}>
        <CurrentSlideComponent />
      </div>

      <div className={styles.navigation}>
        <button 
          onClick={prevSlide} 
          disabled={currentSlide === 0}
          className={`${styles.navButton} ${currentSlide === 0 ? styles.disabled : ''}`}
        >
          ← Anterior
        </button>
        
        <div className={styles.progressBar}>
          <div 
            className={styles.progressFill} 
            style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          />
        </div>
        
        <button 
          onClick={nextSlide} 
          disabled={currentSlide === slides.length - 1}
          className={`${styles.navButton} ${currentSlide === slides.length - 1 ? styles.disabled : ''}`}
        >
          {currentSlide === slides.length - 1 ? '¡Componente List!' : 'Siguiente Paso →'}
        </button>
      </div>
    </div>
  );
};

export default ReactCourse;
