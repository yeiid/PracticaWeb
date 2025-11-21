import React, { useState, useEffect } from 'react';
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
import CourseTitle from '../header/CourseTitle';
import CourseNavigation from '../header/CourseNavigation';
import styles from './JSSlides.module.css';

const JSCourse = ({ onBack }) => {
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
    <div className="courseContainer">
      <CourseTitle 
        title="⚡ Curso JavaScript"
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
    </div>
  );
};

export default JSCourse;
