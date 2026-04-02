import React, { useState } from 'react';
import IntroduccionSlide from './IntroduccionSlide';
import FrontendBackendSlide from './FrontendBackendSlide';
import PilaresSlide from './PilaresSlide';
import HerramientasSlide from './HerramientasSlide';
import EstructuraHTMLSlide from './EstructuraHTMLSlide';
import EtiquetasSlide from './EtiquetasSlide';
import CierreSlide from './CierreSlide';
import CourseTitle from '../header/CourseTitle';
import CourseNavigation from '../header/CourseNavigation';
import styles from './HTMLSlides.module.css';

const HTMLCourse = ({ onBack }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { component: IntroduccionSlide, title: 'Introducción' },
    { component: FrontendBackendSlide, title: 'Frontend vs Backend' },
    { component: PilaresSlide, title: 'Los 3 Pilares' },
    { component: HerramientasSlide, title: 'Herramientas' },
    { component: EstructuraHTMLSlide, title: 'Estructura HTML' },
    { component: EtiquetasSlide, title: 'Etiquetas Básicas' },
    { component: CierreSlide, title: 'Cierre' }
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
    <div className="courseContainer">
      <CourseTitle 
        title="📄 Curso HTML5"
        currentSlide={currentSlide}
        totalSlides={slides.length}
      />

      <div className="slideContainer">
        <CurrentSlideComponent />
      </div>

      <CourseNavigation
        currentSlide={currentSlide}
        totalSlides={slides.length}
        onPrev={prevSlide}
        onNext={nextSlide}
        onSlideSelect={setCurrentSlide}
        className="bottomNavigation"
      />

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

export default HTMLCourse;
