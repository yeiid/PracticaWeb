import React, { useState } from 'react';
import IntroduccionJSSlide from './IntroduccionJSSlide';
import VariablesJSSlide from './VariablesJSSlide';
import OperadoresJSSlide from './OperadoresJSSlide';
import EstructurasJSSlide from './EstructurasJSSlide';
import FuncionesJSSlide from './FuncionesJSSlide';
import ObjetosJSSlide from './ObjetosJSSlide';
import ArraysJSSlide from './ArraysJSSlide';
import DOMJSSlide from './DOMJSSlide';
import EventosJSSlide from './EventosJSSlide';
import ES6JSSlide from './ES6JSSlide';
import CierreJSSlide from './CierreJSSlide';
import styles from '../ModernCourse.module.css';

const JSCourse = ({ onBack }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { component: IntroduccionJSSlide, title: 'El Motor de la Web' },
    { component: VariablesJSSlide, title: 'Datos y Almacenamiento' },
    { component: OperadoresJSSlide, title: 'Operadores Lógicos' },
    { component: EstructurasJSSlide, title: 'Control del Flujo' },
    { component: FuncionesJSSlide, title: 'El Poder de las Funciones' },
    { component: ObjetosJSSlide, title: 'Modelando la Realidad' },
    { component: ArraysJSSlide, title: 'Colecciones de Datos' },
    { component: DOMJSSlide, title: 'Interactuando con la Web' },
    { component: EventosJSSlide, title: 'Capturando Acciones' },
    { component: ES6JSSlide, title: 'JavaScript Moderno ES6+' },
    { component: CierreJSSlide, title: '¡Maestría Alcanzada!' }
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

  // Estilos específicos para JS (Amber/Yellow)
  const jsStyles = {
    '--course-primary': '#facc15',
    '--course-primary-dark': '#ca8a04',
    '--course-accent': 'rgba(250, 204, 21, 0.1)',
    '--course-accent-border': 'rgba(250, 204, 21, 0.2)'
  };

  return (
    <div className={styles.courseContainer} style={jsStyles}>
      <div className={styles.courseHeader}>
        <button onClick={onBack} className={styles.backButton}>← Volver al Panel</button>
        <h1 className={styles.headerTitle}>⚡ {slides[currentSlide].title}</h1>
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
          {currentSlide === slides.length - 1 ? '¡Motor Encendido!' : 'Siguiente Paso →'}
        </button>
      </div>
    </div>
  );
};

export default JSCourse;
