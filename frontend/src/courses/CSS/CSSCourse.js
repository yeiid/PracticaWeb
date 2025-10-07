import React, { useState } from 'react';
import IntroduccionCSSSlide from './IntroduccionCSSSlide';
import SelectoresCSSSlide from './SelectoresCSSSlide';
import ModeloCajaSlide from './ModeloCajaSlide';
import FlexboxSlide from './FlexboxSlide';
import GridSlide from './GridSlide';
import ResponsiveSlide from './ResponsiveSlide';
import AnimacionesSlide from './AnimacionesSlide';
import BuenasPracticasSlide from './BuenasPracticasSlide';
import styles from './CSSSlides.module.css';

const CSSCourse = ({ onBack }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { component: IntroduccionCSSSlide, title: 'Introducción a CSS' },
    { component: SelectoresCSSSlide, title: 'Selectores CSS' },
    { component: ModeloCajaSlide, title: 'Modelo de Caja' },
    { component: FlexboxSlide, title: 'Flexbox' },
    { component: GridSlide, title: 'CSS Grid' },
    { component: ResponsiveSlide, title: 'Diseño Responsivo' },
    { component: AnimacionesSlide, title: 'Animaciones' },
    { component: BuenasPracticasSlide, title: 'Buenas Prácticas' }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const CurrentSlideComponent = slides[currentSlide].component;

  return (
    <div className={styles.courseContainer}>
      <div className={styles.courseHeader}>
        <button className={styles.backButton} onClick={onBack}>← Volver al inicio</button>
        <h1>🎨 Curso CSS3</h1>
        <div className={styles.progress}>
          <span>{currentSlide + 1} de {slides.length}</span>
        </div>
      </div>

      <div className={styles.slideContainer}>
        <CurrentSlideComponent />
      </div>

      <div className={styles.navigation}>
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className={styles.navButton}
        >
          ← Anterior
        </button>

        <div className={styles.slideIndicator}>
          {slides.map((_, index) => (
            <span
              key={index}
              className={`${styles.indicator} ${index === currentSlide ? styles.active : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className={styles.navButton}
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
};

export default CSSCourse;
