import React, { useState, useEffect } from 'react';
import './ProgressSystem.css';

const ProgressSystem = () => {
  const [progress, setProgress] = useState({
    html: { completed: 0, total: 8 },
    css: { completed: 0, total: 8 },
    js: { completed: 0, total: 10 }
  });

  const [showProgress, setShowProgress] = useState(false);

  useEffect(() => {
    // Cargar progreso desde localStorage
    const savedProgress = localStorage.getItem('academia-web-progress');
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }
  }, []);

  const saveProgress = (newProgress) => {
    setProgress(newProgress);
    localStorage.setItem('academia-web-progress', JSON.stringify(newProgress));
  };

  const markSlideCompleted = (course, slideNumber) => {
    const newProgress = { ...progress };
    const courseKey = course.toLowerCase();

    // Si no existe el curso en el progreso, inicializarlo
    if (!newProgress[courseKey]) {
      newProgress[courseKey] = { completed: 0, total: getTotalSlides(courseKey) };
    }

    // Marcar como completado si no lo estaba
    if (!isSlideCompleted(courseKey, slideNumber)) {
      newProgress[courseKey].completed += 1;
      saveProgress(newProgress);
    }
  };

  const isSlideCompleted = (course, slideNumber) => {
    const courseKey = course.toLowerCase();
    if (!progress[courseKey]) return false;

    // Para simplificar, asumimos que si completed > 0, el slide está completado
    // En una implementación más avanzada, podrías rastrear slides específicos
    return progress[courseKey].completed > 0;
  };

  const getTotalSlides = (course) => {
    const totals = { html: 8, css: 8, js: 10 };
    return totals[course] || 0;
  };

  const getProgressPercentage = (course) => {
    const courseKey = course.toLowerCase();
    if (!progress[courseKey]) return 0;
    return Math.round((progress[courseKey].completed / progress[courseKey].total) * 100);
  };

  const resetProgress = () => {
    const initialProgress = {
      html: { completed: 0, total: 8 },
      css: { completed: 0, total: 8 },
      js: { completed: 0, total: 10 }
    };
    saveProgress(initialProgress);
  };

  const courses = [
    { key: 'html', name: 'HTML5', color: '#e34f26', icon: '📄' },
    { key: 'css', name: 'CSS3', color: '#1572b6', icon: '🎨' },
    { key: 'js', name: 'JavaScript', color: '#f7df1e', icon: '⚡' }
  ];

  return (
    <div className="progress-system">
      <button
        className="progress-toggle"
        onClick={() => setShowProgress(!showProgress)}
      >
        📊 {showProgress ? 'Ocultar' : 'Ver'} Progreso
      </button>

      {showProgress && (
        <div className="progress-dashboard">
          <h3>🎯 Tu Progreso de Aprendizaje</h3>

          <div className="progress-grid">
            {courses.map(course => (
              <div key={course.key} className="progress-card">
                <div className="progress-header">
                  <span className="course-icon">{course.icon}</span>
                  <h4>{course.name}</h4>
                  <span className="progress-percentage">
                    {getProgressPercentage(course.key)}%
                  </span>
                </div>

                <div className="progress-bar-container">
                  <div
                    className="progress-bar"
                    style={{
                      width: `${getProgressPercentage(course.key)}%`,
                      backgroundColor: course.color
                    }}
                  ></div>
                </div>

                <div className="progress-stats">
                  <span>{progress[course.key]?.completed || 0} / {getTotalSlides(course.key)} completados</span>
                </div>

                <div className="progress-actions">
                  <button
                    className="mark-completed-btn"
                    onClick={() => {
                      const newProgress = { ...progress };
                      newProgress[course.key] = { completed: getTotalSlides(course.key), total: getTotalSlides(course.key) };
                      saveProgress(newProgress);
                    }}
                    style={{ backgroundColor: course.color }}
                  >
                    Marcar Completo
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="progress-summary">
            <h4>📈 Resumen General</h4>
            <div className="summary-stats">
              <div className="stat">
                <span className="stat-label">Total de Slides:</span>
                <span className="stat-value">26</span>
              </div>
              <div className="stat">
                <span className="stat-label">Completados:</span>
                <span className="stat-value">
                  {Object.values(progress).reduce((sum, course) => sum + (course?.completed || 0), 0)}
                </span>
              </div>
              <div className="stat">
                <span className="stat-label">Progreso General:</span>
                <span className="stat-value">
                  {Math.round((Object.values(progress).reduce((sum, course) => sum + (course?.completed || 0), 0) / 26) * 100)}%
                </span>
              </div>
            </div>
          </div>

          <div className="progress-actions">
            <button className="reset-btn" onClick={resetProgress}>
              🔄 Reiniciar Progreso
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressSystem;
