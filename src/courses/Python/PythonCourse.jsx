import React, { useState } from 'react';
import IntroduccionPythonSlide from './IntroduccionPythonSlide';
import HistoriaPythonSlide from './HistoriaPythonSlide';
import InstalacionPythonSlide from './InstalacionPythonSlide';
import SintaxisPythonSlide from './SintaxisPythonSlide';
import EstructurasPythonSlide from './EstructurasPythonSlide';
import FuncionesPythonSlide from './FuncionesPythonSlide';
import POO_PythonSlide from './POO_PythonSlide';
import LibreriasPythonSlide from './LibreriasPythonSlide';
import HerramientasPythonSlide from './HerramientasPythonSlide';
import CierrePythonSlide from './CierrePythonSlide';
import styles from '../ModernCourse.module.css';

const PythonCourse = ({ onBack }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [ 
    { component: IntroduccionPythonSlide, title: 'El Lenguaje de la Serpiente' },
    { component: HistoriaPythonSlide, title: 'Origen y Evolución' },
    { component: InstalacionPythonSlide, title: 'Entorno de Desarrollo' },
    { component: SintaxisPythonSlide, title: 'Sintaxis Limpia' },
    { component: EstructurasPythonSlide, title: 'Flujo de Ejecución' },
    { component: FuncionesPythonSlide, title: 'Modularidad Eficaz' },
    { component: POO_PythonSlide, title: 'Programación de Objetos' },
    { component: LibreriasPythonSlide, title: 'Ecosistema de Librerías' },
    { component: HerramientasPythonSlide, title: 'Herramientas Pro' },
    { component: CierrePythonSlide, title: '¡Maestría Pythonista!' }
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

  // Estilos específicos para Python (Emerald/Green)
  const pythonStyles = {
    '--course-primary': '#10b981',
    '--course-primary-dark': '#059669',
    '--course-accent': 'rgba(16, 185, 129, 0.1)',
    '--course-accent-border': 'rgba(16, 185, 129, 0.2)'
  };

  return (
    <div className={styles.courseContainer} style={pythonStyles}>
      <div className={styles.courseHeader}>
        <button onClick={onBack} className={styles.backButton}>← Volver al Panel</button>
        <h1 className={styles.headerTitle}>🐍 {slides[currentSlide].title}</h1>
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
          {currentSlide === slides.length - 1 ? '¡Script Finalizado!' : 'Siguiente Paso →'}
        </button>
      </div>
    </div>
  );
};

export default PythonCourse;
