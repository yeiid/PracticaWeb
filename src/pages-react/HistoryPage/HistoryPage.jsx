import React, { useState, lazy, Suspense } from 'react';
import Header from '../../components/Header/Header';
import './HistoryPage.css';

// Lazy loading de componentes 3D para evitar error de SSR
const WebGlobe = lazy(() => import('../../components/3d/computing-history/WebGlobe'));
const ComputingCube = lazy(() => import('../../components/3d/computing-history/ComputingCube'));
const IndustrialCog = lazy(() => import('../../components/3d/computing-history/IndustrialCog'));
const WebJourney = lazy(() => import('../../components/3d/web-history/web-evolution/web-journey'));
const JavaScriptScene = lazy(() => import('../../components/3d/web-history/javascript-scene'));
const WebBirthScene = lazy(() => import('../../components/3d/web-history/web-birth-scene'));

const historyData = {
  categories: [
    { 
      id: 'web',
      title: 'Historia de la Web',
      description: 'Explora los hitos que dieron forma a la World Wide Web.',
      icon: '🌐',
      available: true
    },
    {
      id: 'computing',
      title: 'Historia de la Computación',
      description: 'Un viaje desde las primeras máquinas de cálculo hasta hoy.',
      icon: '💻',
      available: true
    }
  ],
  events: {
    web: [
      { id: 'nacimiento-www', year: '1991', title: 'Nacimiento de la WWW', description: 'Tim Berners-Lee crea la primera página web en el CERN.', icon: '🌐', Component: WebBirthScene },
      { id: 'auge-js', year: '1995', title: 'Auge de JavaScript', description: 'Netscape introduce el lenguaje que daría vida a la web.', icon: '📜', Component: JavaScriptScene },
      { id: 'web-journey', year: '2000-2024', title: 'La Evolución de la Web', description: 'Viaja a través de las eras de la web: 1.0, 2.0 y 3.0 con escenas 3D interactivas.', icon: '🚀', Component: WebJourney }
    ],
    computing: [
      { id: 'maquina-analitica', year: '1837', title: 'La Máquina Analítica', description: 'Charles Babbage concibe el primer computador mecánico programable.', icon: '⚙️', Component: IndustrialCog },
      { id: 'eniac', year: '1945', title: 'ENIAC', description: 'Se presenta el primer computador electrónico de propósito general.', icon: '💡', Component: ComputingCube },
      { id: 'microprocesador', year: '1971', title: 'El Microprocesador', description: 'Intel lanza el 4004, abriendo el camino a la computación personal.', icon: '칩', Component: WebGlobe }
    ]
  }
};

const HistoryPage = () => {
  const [view, setView] = useState('hub'); // 'hub', 'timeline', 'detail'
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleSelectCategory = (categoryId) => {
    const category = historyData.categories.find(c => c.id === categoryId);
    if (category && category.available) {
      setSelectedCategory(category);
      setView('timeline');
    }
  };

  const handleSelectEvent = (eventId) => {
    const event = historyData.events[selectedCategory.id].find(e => e.id === eventId);
    setSelectedEvent(event);
    setView('detail');
  };

  const handleGoBack = () => {
    if (view === 'detail') {
      setView('timeline');
    } else if (view === 'timeline') {
      setView('hub');
    }
  };

  const renderContent = () => {
    switch (view) {
      case 'timeline':
        return (
          <>
            <button onClick={handleGoBack} className="back-btn">← Volver a Categorías</button>
            <div className="history-header">
              <h2>{selectedCategory.icon} {selectedCategory.title}</h2>
            </div>
            <div className="timeline-container" style={{maxWidth: '800px', margin: '0 auto'}}>
              {historyData.events[selectedCategory.id].map(event => (
                <div key={event.id} className="timeline-item-link" onClick={() => handleSelectEvent(event.id)}>
                  <div className="timeline-item">
                    <div className="timeline-icon">{event.icon}</div>
                    <div className="timeline-content">
                      <span className="timeline-year">{event.year}</span>
                      <h4>{event.title}</h4>
                      <p>{event.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        );
      case 'detail':
        const EventComponent = selectedEvent.Component;
        return (
          <>
            <button onClick={handleGoBack} className="back-btn">← Volver a la Línea de Tiempo</button>
            <div className="detail-header">
              <h2>{selectedEvent.icon} {selectedEvent.title}</h2>
            </div>
            <div className="detail-content-wrapper">
              <div className="detail-3d-view">
                <Suspense fallback={<div className="loading-3d">⏳ Cargando escena 3D...</div>}>
                  <EventComponent />
                </Suspense>
                <p className="interactive-description">{selectedEvent.description}</p>
              </div>
            </div>
          </>
        );
      default: // hub
        return (
          <>
            <div className="history-header">
              <h2>Un Viaje a Través del Tiempo Tecnológico</h2>
              <p>Explora los momentos clave que definieron el mundo.</p>
            </div>
            <div className="history-cards-grid">
              {historyData.categories.map(cat => (
                <div key={cat.id} className={`history-card ${!cat.available ? 'locked' : ''}`} onClick={() => handleSelectCategory(cat.id)}>
                  <div className="history-card-icon">{cat.icon}</div>
                  <h3>{cat.title}</h3>
                  <p>{cat.description}</p>
                  <div className="explore-btn-container">
                    {cat.available ? <span className="explore-btn">Explorar</span> : <span className="soon-badge">Próximamente</span>}
                  </div>
                </div>
              ))}
            </div>
          </>
        );
    }
  };

  return (
    <div className="page-container">
      <Header />
      <main className="main-content-history">
        {renderContent()}
      </main>
    </div>
  );
};

export default HistoryPage;
