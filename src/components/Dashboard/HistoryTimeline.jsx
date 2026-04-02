import React from 'react';
import './HistoryTimeline.css';

const historyEvents = [
  {
    year: '1989',
    title: 'Nacimiento de la Web',
    description: 'Tim Berners-Lee, un científico del CERN, propone un sistema de gestión de la información que se convertiría en la World Wide Web.',
    icon: '🌐'
  },
  {
    year: '1993',
    title: 'Mosaic: El Primer Navegador Popular',
    description: 'Se lanza Mosaic, el primer navegador web gráfico que popularizó el uso de la web y facilitó la visualización de imágenes junto al texto.',
    icon: '🖼️'
  },
  {
    year: '1995',
    title: 'Lanzamiento de JavaScript',
    description: 'Netscape introduce JavaScript, un lenguaje de scripting que permite la interactividad en las páginas web, cambiando el juego para siempre.',
    icon: '⚡'
  },
  {
    year: '1996',
    title: 'Nace CSS',
    description: 'El W3C publica la primera especificación de CSS, permitiendo a los desarrolladores separar el contenido (HTML) de la presentación (CSS).',
    icon: '🎨'
  },
  {
    year: '2005',
    title: 'La Era de AJAX y la Web 2.0',
    description: 'Términos como AJAX se popularizan, permitiendo a las aplicaciones web actualizar contenido de forma asíncrona, haciendo la web más rápida y dinámica.',
    icon: '🔄'
  },
  {
    year: '2014',
    title: 'HTML5 se convierte en estándar',
    description: 'El W3C finaliza la especificación de HTML5, introduciendo nuevas etiquetas semánticas, soporte para video y audio, y mucho más.',
    icon: '📄'
  }
];

const HistoryTimeline = () => {
  return (
    <section className="history-timeline-section">
      <h2>📜 Un Viaje por la Historia de la Web</h2>
      <div className="timeline-container">
        {historyEvents.map((event, index) => (
          <div key={index} className="timeline-item">
            <div className="timeline-icon">{event.icon}</div>
            <div className="timeline-content">
              <span className="timeline-year">{event.year}</span>
              <h4>{event.title}</h4>
              <p>{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HistoryTimeline;
