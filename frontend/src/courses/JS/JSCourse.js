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
import styles from './JSSlides.module.css';

const JSCourse = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { component: IntroduccionJSSlide, title: 'Introducción a JavaScript' },
    { component: VariablesJSSlide, title: 'Variables y Tipos de Datos' },
    { component: OperadoresJSSlide, title: 'Operadores' },
    { component: EstructurasJSSlide, title: 'Estructuras de Control' },
    { component: FuncionesJSSlide, title: 'Funciones' },
    { component: ObjetosJSSlide, title: 'Objetos' },
    { component: ArraysJSSlide, title: 'Arrays' },
    { component: DOMJSSlide, title: 'DOM' },
    { component: EventosJSSlide, title: 'Eventos' },
    { component: ES6JSSlide, title: 'ES6+ Moderno' },
    { component: CierreJSSlide, title: 'Cierre' }
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
        <h1>⚡ Curso JavaScript</h1>
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

export default JSCourse;
