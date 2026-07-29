import React, { useState } from 'react';
import './ProgressSystem.css';
import { useProgress } from '../../contexts/ProgressContext';
import { useAuth } from '../../contexts/AuthContext';

const courseNames = {
  html: 'HTML5',
  css: 'CSS3',
  js: 'JavaScript',
  python: 'Python',
  react: 'React',
  backend: 'Backend',
  git: 'Git',
};

const ProgressSystem = () => {
  const { user } = useAuth();
  const { progress, getCourseProgress, getOverallProgress, resetCourse } = useProgress();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return null;

  const overall = getOverallProgress();
  const courseIds = Object.keys(progress).filter(id => progress[id]?.total > 0);

  return (
    <div className="progress-system">
      <button
        className="progress-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Abrir panel de progreso"
      >
        {isOpen ? '✕ Cerrar' : `📊 ${overall.percentage}%`}
      </button>

      {isOpen && (
        <div className="progress-dashboard">
          <h3>📈 Tu Progreso</h3>

          <div className="progress-overall">
            <div className="progress-item-label">Total General</div>
            <div className="progress-bar-container">
              <div className="progress-bar-fill" style={{ width: `${overall.percentage}%` }} />
            </div>
            <div className="progress-item-value">{overall.completed}/{overall.total} lecciones ({overall.percentage}%)</div>
          </div>

          <div className="progress-divider" />

          {courseIds.length === 0 ? (
            <p className="progress-empty">Aún no has iniciado ningún curso.</p>
          ) : (
            courseIds.map(id => {
              const cp = getCourseProgress(id);
              return (
                <div key={id} className="progress-item">
                  <div className="progress-item-header">
                    <span className="progress-item-label">{courseNames[id] || id}</span>
                    {cp.isComplete && <span className="progress-badge-complete">✅ Completado</span>}
                  </div>
                  <div className="progress-bar-container">
                    <div className="progress-bar-fill" style={{ width: `${cp.percentage}%` }} />
                  </div>
                  <div className="progress-item-footer">
                    <span className="progress-item-value">{cp.completed}/{cp.total} lecciones</span>
                    {cp.isComplete && cp.completedAt && (
                      <span className="progress-date">
                        {new Date(cp.completedAt).toLocaleDateString('es-ES')}
                      </span>
                    )}
                  </div>
                  {user?.role === 'admin' && (
                    <button
                      className="progress-reset-btn"
                      onClick={() => resetCourse(id)}
                      title="Reiniciar progreso"
                    >
                      ↺ Reiniciar
                    </button>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default ProgressSystem;
