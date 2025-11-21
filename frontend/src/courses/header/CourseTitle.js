import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CourseHeader.module.css';

const CourseTitle = ({ 
  title, 
  currentSlide, 
  totalSlides 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Efecto para manejar el scroll y cambiar el estilo del encabezado
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Calcular el porcentaje de progreso
  const progressPercentage = Math.round(((currentSlide + 1) / totalSlides) * 100);

  return (
    <div className={`${styles.courseHeader} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.headerContent}>
        
        <div className={styles.titleWrapper}>
          <h1 className={styles.title} title={title}>
            {title}
          </h1>
          
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill}
              style={{ width: `${progressPercentage}%` }}
              aria-valuenow={progressPercentage}
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
        </div>
        
        <div className={styles.progress} aria-label={`Diapositiva ${currentSlide + 1} de ${totalSlides}`}>
          <span className={styles.progressText}>
            <span className={styles.currentSlide} aria-hidden="true">{currentSlide + 1}</span>
            <span className={styles.slideSeparator} aria-hidden="true">/</span>
            <span className={styles.totalSlides} aria-hidden="true">{totalSlides}</span>
            <span className={styles.screenReaderOnly}>
              Diapositiva {currentSlide + 1} de {totalSlides}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default CourseTitle;
