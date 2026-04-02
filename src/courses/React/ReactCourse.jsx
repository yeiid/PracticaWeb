import React, { useState } from 'react';
import { IntroduccionReactSlide } from './IntroduccionReactSlide';
import { ComponentesSlide } from './ComponentesSlide';
import { PropsStateSlide } from './PropsStateSlide';
// Importar los demás slides cuando estén creados
// import { HooksSlide } from './HooksSlide';
// import { EventosSlide } from './EventosSlide';
// import { ReactRouterSlide } from './ReactRouterSlide';
// import { ContextAPISlide } from './ContextAPISlide';
// import { PeticionesHTTPSlide } from './PeticionesHTTPSlide';
// import { TestingSlide } from './TestingSlide';
// import { DespliegueSlide } from './DespliegueSlide';
import CourseTitle from '../header/CourseTitle';
import CourseNavigation from '../header/CourseNavigation';
import styles from './ReactSlides.module.css';

const ReactCourse = ({ onBack }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { component: IntroduccionReactSlide, title: 'Introducción a React' },
    { component: ComponentesSlide, title: 'Componentes' },
    { component: PropsStateSlide, title: 'Props y Estado' },
    // Agregar los demás slides cuando estén creados
    // { component: HooksSlide, title: 'Hooks' },
    // { component: EventosSlide, title: 'Manejo de Eventos' },
    // { component: ReactRouterSlide, title: 'React Router' },
    // { component: ContextAPISlide, title: 'Context API' },
    // { component: PeticionesHTTPSlide, title: 'Peticiones HTTP' },
    // { component: TestingSlide, title: 'Testing' },
    // { component: DespliegueSlide, title: 'Despliegue' }
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
        title="⚛️ Curso de React"
        currentSlide={currentSlide}
        totalSlides={slides.length}
        onBack={onBack}
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
          Anterior
        </button>
        <button 
          onClick={nextSlide} 
          disabled={currentSlide === slides.length - 1}
          className={styles.navButton}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default ReactCourse;
