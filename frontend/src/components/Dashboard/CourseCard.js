import React from 'react';
import './CourseCard.css';

const CourseCard = ({ course, onSelect, progress }) => {
  const { icon, title, description, color, slides } = course;

  return (
    <div
      className="course-card-modern"
      onClick={() => onSelect(course)}
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
      <div className="course-progress-modern">
        <div className="progress-bar-wrapper">
          <div
            className="progress-bar-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <span className="progress-text-modern">{progress}% completado</span>
      </div>
      <button className="start-course-btn">Comenzar</button>
    </div>
  );
};

export default CourseCard;
