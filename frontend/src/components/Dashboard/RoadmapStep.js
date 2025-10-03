import React from 'react';
import './RoadmapStep.css';

const RoadmapStep = ({ step, onSelect, progress }) => {
  const { id, title, description, completed, course, icon } = step;

  const getStatus = () => {
    if (!completed) return 'locked';
    if (progress === 100) return 'completed';
    if (progress > 0) return 'in-progress';
    return 'unlocked';
  };

  const status = getStatus();

  return (
    <div
      className={`roadmap-step-modern ${status}`}
      onClick={() => completed && onSelect()}
    >
      <div className="step-icon-modern">{icon || '🔒'}</div>
      <div className="step-content-modern">
        <span className="step-number-modern">Paso {id}</span>
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
      {completed && (
        <div className="step-progress-container">
          <div className="step-progress-bar" style={{ width: `${progress}%` }}></div>
          <span className="step-progress-text">{progress}%</span>
        </div>
      )}
      {!completed && <div className="lock-overlay">Próximamente</div>}
    </div>
  );
};

export default RoadmapStep;
