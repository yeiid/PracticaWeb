import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import HistoryTimeline from '../../components/Dashboard/HistoryTimeline';
import WebGlobe from '../../components/3d/WebGlobe';
import ComputingCube from '../../components/3d/ComputingCube';
import IndustrialCog from '../../components/3d/IndustrialCog';
import ComputingHistory from '../../components/Dashboard/ComputingHistory';
import IndustrialHistory from '../../components/Dashboard/IndustrialHistory';
import './HistoryPage.css';

const historySections = [
  {
    id: 'web-history',
    title: 'Historia de la Web',
    description: 'Un recorrido desde el nacimiento de la WWW hasta el estándar de HTML5.',
    component: <HistoryTimeline />,
    interactiveComponent: <WebGlobe />,
    icon: '🌐'
  },
  {
    id: 'computing-history',
    title: 'Historia de la Computación',
    description: 'Desde el ábaco hasta las supercomputadoras cuánticas.',
    component: <ComputingHistory />,
    interactiveComponent: <ComputingCube />,
    icon: '💻'
  },
  {
    id: 'industrial-revolution',
    title: 'Revolución Industrial',
    description: 'El cambio de la producción manual a la maquinaria que transformó el mundo.',
    component: <IndustrialHistory />,
    interactiveComponent: <IndustrialCog />,
    icon: '🏭'
  }
];

const HistoryPage = () => {
  const [selectedSection, setSelectedSection] = useState(null);

  const handleSelectSection = (section) => {
    if (section.component) {
      setSelectedSection(section);
    }
  };

  const handleGoBack = () => {
    setSelectedSection(null);
  };

  if (selectedSection) {
    return (
      <div className="page-container">
        <Header />
        <main className="main-content-history detail-view">
          <button onClick={handleGoBack} className="back-btn">← Volver a la historia</button>
          <div className="detail-header">
            <h2>{selectedSection.icon} {selectedSection.title}</h2>
          </div>
          <div className="detail-content-wrapper">
            <div className="detail-3d-view">
              {selectedSection.interactiveComponent}
            </div>
            <div className="detail-timeline-view">
              {selectedSection.component}
            </div>
          </div>
        </main>
      </div>
    );
  }

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
            <div 
              key={section.id} 
              className={`history-card ${!section.component ? 'locked' : ''}`}
              onClick={() => handleSelectSection(section)}
            >
              <div className="history-card-icon">{section.icon}</div>
              <h3>{section.title}</h3>
              <p>{section.description}</p>
              <div className="explore-btn-container">
                {section.component ? (
                  <span className="explore-btn">Explorar</span>
                ) : (
                  <span className="soon-badge">Próximamente</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default HistoryPage;
