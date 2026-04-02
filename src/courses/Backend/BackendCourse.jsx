import React, { useState } from 'react';
import { IntroduccionBackendSlide } from './IntroduccionBackendSlide';
import { NodeJSSlide } from './NodeJSSlide';
import { ExpressSlide } from './ExpressSlide';
import { APIRestSlide } from './APIRestSlide';
import { BaseDeDatosSlide } from './BaseDeDatosSlide';
import { AutenticacionSlide } from './AutenticacionSlide';
import { DespliegueBackendSlide } from './DespliegueBackendSlide';
import styles from '../ModernCourse.module.css';

const BackendCourse = ({ onBack }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { component: IntroduccionBackendSlide, title: 'El Corazón del Sistema' },
    { component: NodeJSSlide, title: 'Node.js y el V8 Engine' },
    { component: ExpressSlide, title: 'Servidores con Express.js' },
    { component: APIRestSlide, title: 'Diseño de APIs REST' },
    { component: BaseDeDatosSlide, title: 'Persistencia de Datos' },
    { component: AutenticacionSlide, title: 'Seguridad y JWT' },
    { component: DespliegueBackendSlide, title: 'Hacia la Nube' }
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

  // Estilos específicos para Backend (Pink/Purple)
  const backendStyles = {
    '--course-primary': '#ec4899',
    '--course-primary-dark': '#db2777',
    '--course-accent': 'rgba(236, 72, 153, 0.1)',
    '--course-accent-border': 'rgba(236, 72, 153, 0.2)'
  };

  return (
    <div className={styles.courseContainer} style={backendStyles}>
      <div className={styles.courseHeader}>
        <button onClick={onBack} className={styles.backButton}>← Volver al Panel</button>
        <h1 className={styles.headerTitle}>⚙️ {slides[currentSlide].title}</h1>
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
          {currentSlide === slides.length - 1 ? '¡Backend Operativo!' : 'Siguiente Paso →'}
        </button>
      </div>
    </div>
  );
};

export default BackendCourse;
