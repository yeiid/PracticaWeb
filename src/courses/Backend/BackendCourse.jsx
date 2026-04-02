import React, { useState } from 'react';
import { IntroduccionBackendSlide } from './IntroduccionBackendSlide';
import { NodeJSSlide } from './NodeJSSlide';
import { ExpressSlide } from './ExpressSlide';
import { APIRestSlide } from './APIRestSlide';
import { BaseDeDatosSlide } from './BaseDeDatosSlide';
import { AutenticacionSlide } from './AutenticacionSlide';
import { DespliegueBackendSlide } from './DespliegueBackendSlide';
import styles from './BackendSlides.module.css';

const BackendCourse = ({ onBack }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { component: IntroduccionBackendSlide, title: 'Introducción al Backend' },
    { component: NodeJSSlide, title: 'Fundamentos de Node.js' },
    { component: ExpressSlide, title: 'Express.js Framework' },
    { component: APIRestSlide, title: 'APIs RESTful' },
    { component: BaseDeDatosSlide, title: 'Bases de Datos' },
    { component: AutenticacionSlide, title: 'Autenticación y Seguridad' },
    { component: DespliegueBackendSlide, title: 'Despliegue' }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
      // Desplazar hacia arriba al cambiar de slide
      window.scrollTo(0, 0);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
      // Desplazar hacia arriba al cambiar de slide
      window.scrollTo(0, 0);
    }
  };

  const CurrentSlideComponent = slides[currentSlide].component;

  return (
    <div className={styles.courseContainer}>
      <div className={styles.courseHeader}>
        <button onClick={onBack} className={styles.backButton}>← Volver al Dashboard</button>
        <h1>⚙️ {slides[currentSlide].title}</h1>
        <div className={styles.progress}>
          <span>Progreso: {currentSlide + 1}/{slides.length}</span>
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
          aria-label="Slide anterior"
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
          aria-label="Siguiente slide"
        >
          {currentSlide === slides.length - 1 ? '¡Completado!' : 'Siguiente →'}
        </button>
      </div>
    </div>
  );
};

export default BackendCourse;
