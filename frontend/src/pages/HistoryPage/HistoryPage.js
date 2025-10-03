import React from 'react';
import Header from '../../components/Header/Header';
import HistoryTimeline from '../../components/Dashboard/HistoryTimeline'; // Lo moveremos luego
import './HistoryPage.css';

const historySections = [
  {
    id: 'web-history',
    title: 'Historia de la Web',
    description: 'Un recorrido desde el nacimiento de la WWW hasta el estándar de HTML5.',
    component: <HistoryTimeline />,
    icon: '🌐'
  },
  {
    id: 'computing-history',
    title: 'Historia de la Computación',
    description: 'Desde el ábaco hasta las supercomputadoras cuánticas. (Próximamente)',
    component: null,
    icon: '💻'
  },
  {
    id: 'industrial-revolution',
    title: 'Revolución Industrial',
    description: 'El cambio de la producción manual a la maquinaria que transformó el mundo. (Próximamente)',
    component: null,
    icon: '🏭'
  }
];

const HistoryPage = () => {
  return (
    <div className="page-container">
      <Header />
      <main className="main-content-history">
        <div className="history-header">
          <h2>Un Viaje a Través del Tiempo Tecnológico</h2>
          <p>Explora los momentos clave que definieron el mundo en el que vivimos hoy.</p>
        </div>
        <div className="history-cards-grid">
          {historySections.map(section => (
            <div key={section.id} className={`history-card ${!section.component ? 'locked' : ''}`}>
              <div className="history-card-icon">{section.icon}</div>
              <h3>{section.title}</h3>
              <p>{section.description}</p>
              {section.component ? (
                <button className="explore-btn">Explorar</button>
              ) : (
                <span className="soon-badge">Próximamente</span>
              )}
            </div>
          ))}
        </div>
        
        {/* Por ahora, mostramos la línea de tiempo aquí directamente */}
        <div className="timeline-display-section">
          <HistoryTimeline />
        </div>

      </main>
    </div>
  );
};

export default HistoryPage;
