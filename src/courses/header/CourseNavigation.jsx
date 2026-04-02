import React, { useEffect, useRef } from 'react';
import styles from './CourseHeader.module.css';

const CourseNavigation = ({ 
  currentSlide, 
  totalSlides, 
  onPrev, 
  onNext, 
  onSlideSelect,
  className = ''
}) => {
  const indicatorsRef = useRef(null);

  // Efecto para mantener visible el indicador actual en la navegación
  useEffect(() => {
    if (indicatorsRef.current) {
      const activeIndicator = indicatorsRef.current.querySelector(`.${styles.active}`);
      if (activeIndicator) {
        activeIndicator.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  }, [currentSlide]);

  // Función para manejar el desplazamiento del teclado
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft' && currentSlide > 0) {
        onPrev();
      } else if (e.key === 'ArrowRight' && currentSlide < totalSlides - 1) {
        onNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentSlide, totalSlides, onPrev, onNext]);

  return (
    <div className={`${styles.navigation} ${className}`} role="navigation" aria-label="Navegación del curso">
      <button
        onClick={onPrev}
        disabled={currentSlide === 0}
        className={`${styles.navButton} ${styles.prevButton}`}
        aria-label="Diapositiva anterior"
      >
        <span className={styles.buttonIcon}>←</span>
        <span className={styles.buttonText}>Anterior</span>
      </button>

      <div className={styles.slideIndicators} ref={indicatorsRef}>
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => onSlideSelect(index)}
            className={`${styles.slideIndicator} ${
              index === currentSlide ? styles.active : ''
            }`}
            aria-label={`Ir a la diapositiva ${index + 1} de ${totalSlides}`}
            aria-current={index === currentSlide ? 'step' : undefined}
          >
            <span className={styles.screenReaderOnly}>
              Diapositiva {index + 1}
            </span>
          </button>
        ))}
      </div>

      <button
        onClick={onNext}
        disabled={currentSlide === totalSlides - 1}
        className={`${styles.navButton} ${styles.nextButton}`}
        aria-label="Siguiente diapositiva"
      >
        <span className={styles.buttonText}>Siguiente</span>
        <span className={styles.buttonIcon}>→</span>
      </button>
    </div>
  );
};

export default CourseNavigation;
