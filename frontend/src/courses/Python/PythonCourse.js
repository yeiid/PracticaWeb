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
import styles from './PythonSlides.module.css';

const PythonCourse = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { component: IntroduccionPythonSlide, title: 'Introducción a Python' },
    { component: HistoriaPythonSlide, title: 'Historia de Python' },
    { component: InstalacionPythonSlide, title: 'Instalación y Configuración' },
    { component: SintaxisPythonSlide, title: 'Sintaxis Básica' },
    { component: EstructurasPythonSlide, title: 'Estructuras de Control' },
    { component: FuncionesPythonSlide, title: 'Funciones' },
    { component: POO_PythonSlide, title: 'Programación Orientada a Objetos' },
    { component: LibreriasPythonSlide, title: 'Librerías Más Importantes' },
    { component: HerramientasPythonSlide, title: 'Herramientas de Desarrollo' },
    { component: CierrePythonSlide, title: 'Cierre' }
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
        <h1>🐍 Curso Python</h1>
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

export default PythonCourse;
