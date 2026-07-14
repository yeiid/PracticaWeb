import React from 'react';

const industrialEvents = [
  {
    year: '1712',
    title: 'La Máquina de Vapor',
    description: 'Thomas Newcomen inventa la máquina de vapor atmosférica, sentando las bases de la mecanización.',
    icon: '💨'
  },
  {
    year: '1764',
    title: 'La Spinning Jenny',
    description: 'James Hargreaves crea la Jenny, revolucionando la industria textil con múltiples husos.',
    icon: '🧵'
  },
  {
    year: '1793',
    title: 'El Desmotador de Algodón',
    description: 'Eli Whitney inventa la máquina que separa la semilla del algodón, transformando la agricultura.',
    icon: '🌾'
  },
  {
    year: '1837',
    title: 'La Máquina Analítica',
    description: 'Charles Babbage concibe el primer computador mecánico programable, conectando la Revolución Industrial con la era digital.',
    icon: '⚙️'
  },
  {
    year: '1876',
    title: 'El Teléfono',
    description: 'Alexander Graham Bell patenta el teléfono, inaugurando la era de las comunicaciones instantáneas.',
    icon: '📞'
  },
  {
    year: '1886',
    title: 'El Automóvil',
    description: 'Karl Benz presenta el Motorwagen, el primer automóvil de producción. La movilidad personal cambia para siempre.',
    icon: '🚗'
  }
];

const IndustrialHistory = () => (
  <div className="industrial-history-container" style={{
    padding: '40px 20px',
    maxWidth: '900px',
    margin: '0 auto'
  }}>
    <h3 style={{
      fontSize: '2rem',
      fontWeight: 800,
      color: '#F8FAFC',
      textAlign: 'center',
      marginBottom: '10px',
      fontFamily: 'var(--font-heading, Space Grotesk, sans-serif)',
      letterSpacing: '-1px'
    }}>
      La Revolución Industrial
    </h3>
    <p style={{
      textAlign: 'center',
      color: '#4A5568',
      marginBottom: '40px',
      fontSize: '1.05rem'
    }}>
      Cómo la mecanización del trabajo transformó la humanidad y sentó las bases de la tecnología moderna.
    </p>

    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '20px'
    }}>
      {industrialEvents.map((event, index) => (
        <div key={index} style={{
          background: '#1A2235',
          borderRadius: '16px',
          padding: '24px',
          border: '1px solid #252E42',
          borderLeft: '3px solid #F97316',
          transition: 'all 0.3s ease',
          cursor: 'default'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <span style={{ fontSize: '1.5rem' }}>{event.icon}</span>
            <span style={{
              fontSize: '0.8rem',
              fontWeight: 700,
              color: '#F97316',
              fontFamily: 'var(--font-mono, JetBrains Mono, monospace)',
              background: 'rgba(249, 115, 22, 0.15)',
              padding: '2px 10px',
              borderRadius: '6px'
            }}>
              {event.year}
            </span>
          </div>
          <h4 style={{
            margin: '0 0 8px 0',
            fontSize: '1.15rem',
            fontWeight: 700,
            color: '#F8FAFC',
            fontFamily: 'var(--font-heading, Space Grotesk, sans-serif)'
          }}>
            {event.title}
          </h4>
          <p style={{
            margin: 0,
            fontSize: '0.9rem',
            color: '#4A5568',
            lineHeight: 1.6
          }}>
            {event.description}
          </p>
        </div>
      ))}
    </div>
  </div>
);

export default IndustrialHistory;
