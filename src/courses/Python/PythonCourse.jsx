import React, { useState, useEffect } from 'react';
// Importar los slides
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
// Importar componentes de UI
import CourseTitle from '../header/CourseTitle';
import CourseNavigation from '../header/CourseNavigation';
// Importar estilos globales


const PythonCourse = ({ onBack }) => {
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

  // Efecto para manejar el scroll al cambiar de slide
  useEffect(() => {
    // Hacer scroll suave al principio del contenedor al cambiar de slide
    const container = document.querySelector('.courseContainer');
    if (container) {
      container.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, [currentSlide]);

  return (
    <div className="courseContainer">
      <div className="courseContent">
        <CourseTitle 
          title="🐍 Curso de Python"
          currentSlide={currentSlide}
          totalSlides={slides.length}
          onBack={onBack}
        />

        <div className="slideContainer">
          <div className="slide">
            <CurrentSlideComponent />
          </div>
        </div>
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

export default PythonCourse;
