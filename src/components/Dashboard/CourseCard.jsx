import React, { memo, useCallback } from 'react';
import './CourseCard.css';

const CourseCard = memo(({ course, onSelect, progress }) => {
  const { icon, title, description, color, slides } = course;

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(course);
    }
  }, [course, onSelect]);

  return (
    <div
      className="course-card-modern"
      onClick={() => onSelect(course)}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`Curso: ${title}, ${slides} lecciones, ${progress}% completado`}
      style={{ '--course-color': color }}
    >
      <div className="course-card-header">
        <div className="course-icon-modern">{icon}</div>
        <div className="course-title-modern">
          <h3>{title}</h3>
          <span>{slides} lecciones</span>
        </div>
      </div>
      <p className="course-description-modern">{description}</p>
      <div className="course-progress-modern" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label={`Progreso: ${progress}%`}>
        <div className="progress-bar-wrapper">
          <div
            className="progress-bar-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <span className="progress-text-modern">{progress}% completado</span>
      </div>
      <button className="start-course-btn" aria-label={`Comenzar curso ${title}`}>Comenzar</button>
    </div>
  );
});

CourseCard.displayName = 'CourseCard';

export default CourseCard;
