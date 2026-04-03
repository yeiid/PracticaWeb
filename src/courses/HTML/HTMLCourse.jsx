import React, { useState } from 'react';
import IntroduccionSlide from './IntroduccionSlide';
import FrontendBackendSlide from './FrontendBackendSlide';
import PilaresSlide from './PilaresSlide';
import HerramientasSlide from './HerramientasSlide';
import EstructuraHTMLSlide from './EstructuraHTMLSlide';
import EtiquetasSlide from './EtiquetasSlide';
import HTMLQuiz from './HTMLQuiz';
import CierreSlide from './CierreSlide';
import styles from '../ModernCourse.module.css';

const HTMLCourse = ({ onBack }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { component: IntroduccionSlide, title: 'Introducción a HTML5' },
    { component: FrontendBackendSlide, title: 'Frontend vs Backend' },
    { component: PilaresSlide, title: 'Los 3 Pilares del Web' },
    { component: HerramientasSlide, title: 'Tu Arsenal de Trabajo' },
    { component: EstructuraHTMLSlide, title: 'La Columna Vertebral' },
    { component: EtiquetasSlide, title: 'Etiquetas Esenciales' },
    { component: HTMLQuiz, title: 'Evaluación de HTML5' },
    { component: CierreSlide, title: '¡Misión Cumplida!' }
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

  // Estilos específicos para HTML (Azul)
  const htmlStyles = {
    '--course-primary': '#3498db',
    '--course-primary-dark': '#2980b9',
    '--course-accent': 'rgba(52, 152, 219, 0.1)',
    '--course-accent-border': 'rgba(52, 152, 219, 0.2)'
  };

  return (
    <div className={styles.courseContainer} style={htmlStyles}>
      <div className={styles.courseHeader}>
        <button onClick={onBack} className={styles.backButton}>← Volver al Panel</button>
        <h1 className={styles.headerTitle}>📄 {slides[currentSlide].title}</h1>
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
          {currentSlide === slides.length - 1 ? '¡Finalizar Cimiento!' : 'Siguiente Paso →'}
        </button>
      </div>
    </div>
  );
};

export default HTMLCourse;
