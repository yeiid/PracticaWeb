import React, { useState } from 'react';
import IntroduccionCSSSlide from './IntroduccionCSSSlide';
import SelectoresCSSSlide from './SelectoresCSSSlide';
import ModeloCajaSlide from './ModeloCajaSlide';
import FlexboxSlide from './FlexboxSlide';
import GridSlide from './GridSlide';
import ResponsiveSlide from './ResponsiveSlide';
import AnimacionesSlide from './AnimacionesSlide';
import BuenasPracticasSlide from './BuenasPracticasSlide';
import styles from '../ModernCourse.module.css';

const CSSCourse = ({ onBack }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { component: IntroduccionCSSSlide, title: 'Introducción a CSS3' },
    { component: SelectoresCSSSlide, title: 'Selectores y Cascada' },
    { component: ModeloCajaSlide, title: 'El Modelo de Caja' },
    { component: FlexboxSlide, title: 'Flexbox Magic' },
    { component: GridSlide, title: 'CSS Grid Layout' },
    { component: ResponsiveSlide, title: 'Diseño Responsivo' },
    { component: AnimacionesSlide, title: 'Animaciones y Transiciones' },
    { component: BuenasPracticasSlide, title: 'Arquitectura y Clean CSS' }
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

  // Estilos específicos para CSS (Indigo/Cyan)
  const cssStyles = {
    '--course-primary': '#0ea5e9',
    '--course-primary-dark': '#0284c7',
    '--course-accent': 'rgba(14, 165, 233, 0.1)',
    '--course-accent-border': 'rgba(14, 165, 233, 0.2)'
  };

  return (
    <div className={styles.courseContainer} style={cssStyles}>
      <div className={styles.courseHeader}>
        <button onClick={onBack} className={styles.backButton}>← Volver al Panel</button>
        <h1 className={styles.headerTitle}>🎨 {slides[currentSlide].title}</h1>
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
          {currentSlide === slides.length - 1 ? '¡Estilo Dominado!' : 'Siguiente Paso →'}
        </button>
      </div>
    </div>
  );
};

export default CSSCourse;
