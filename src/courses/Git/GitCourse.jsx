import React, { useState } from 'react';
import { Day1 } from './Slides/Day1';
import { Day2 } from './Slides/Day2';
import { Day3 } from './Slides/Day3';
import { Day4 } from './Slides/Day4';
import { Day5 } from './Slides/Day5';
import { Day6 } from './Slides/Day6';
import { Day7 } from './Slides/Day7';
import styles from '../ModernCourse.module.css';

const GitCourse = ({ onBack }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { component: Day1, title: 'Día 1: Los Cimientos' },
    { component: Day2, title: 'Día 2: Viaje en el Tiempo' },
    { component: Day3, title: 'Día 3: Universos Paralelos' },
    { component: Day4, title: 'Día 4: Resolución de Conflictos' },
    { component: Day5, title: 'Día 5: El Puente al Mundo' },
    { component: Day6, title: 'Día 6: Herramientas de Poder' },
    { component: Day7, title: 'Día 7: Flujo Profesional' }
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

  // Estilos específicos para Git (Naranja original)
  const gitStyles = {
    '--course-primary': '#f97316',
    '--course-primary-dark': '#ea580c',
    '--course-accent': 'rgba(249, 115, 22, 0.1)',
    '--course-accent-border': 'rgba(249, 115, 22, 0.2)'
  };

  return (
    <div className={styles.courseContainer} style={gitStyles}>
      <div className={styles.courseHeader}>
        <button onClick={onBack} className={styles.backButton}>← Volver al Panel</button>
        <h1 className={styles.headerTitle}>🧡 {slides[currentSlide].title}</h1>
        <div className={styles.progress}>
          Día {currentSlide + 1} de {slides.length}
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
          {currentSlide === slides.length - 1 ? '¡Meta Alcanzada!' : 'Siguiente Paso →'}
        </button>
      </div>
    </div>
  );
};

export default GitCourse;
