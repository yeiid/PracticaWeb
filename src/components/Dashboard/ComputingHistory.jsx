import React from 'react';

const computingEvents = [
  {
    year: '1642',
    title: 'La Calculadora de Pascal',
    description: 'Blaise Pascal inventa la Pascalina, la primera calculadora mecánica capaz de sumar y restar.',
    icon: '🔢',
    pioneer: 'Blaise Pascal'
  },
  {
    year: '1837',
    title: 'La Máquina Analítica',
    description: 'Charles Babbage diseña el primer computador mecánico programable, la base de todo lo que vendría.',
    icon: '⚙️',
    pioneer: 'Charles Babbage'
  },
  {
    year: '1936',
    title: 'La Máquina de Turing',
    description: 'Alan Turing formaliza el concepto de algoritmo con su máquina teórica, fundamento de la computación moderna.',
    icon: '🧮',
    pioneer: 'Alan Turing'
  },
  {
    year: '1945',
    title: 'ENIAC',
    description: 'Se presenta el primer computador electrónico de propósito general: 18,000 tubos de vacío, 30 toneladas.',
    icon: '💡',
    pioneer: 'John Mauchly & J. Presper Eckert'
  },
  {
    year: '1971',
    title: 'El Microprocesador',
    description: 'Intel lanza el 4004, el primer microprocesador comercial. Una computadora entera en un solo chip.',
    icon: '🔲',
    pioneer: 'Ted Hoff'
  },
  {
    year: '1981',
    title: 'El IBM PC',
    description: 'IBM presenta el Personal Computer. Las computadoras llegan a los hogares y oficinas del mundo.',
    icon: '🖥️',
    pioneer: 'Don Estridge'
  },
  {
    year: '2007',
    title: 'El iPhone',
    description: 'Apple reinventa la computación personal: todo el poder de una PC en tu bolsillo.',
    icon: '📱',
    pioneer: 'Steve Jobs'
  }
];

const ComputingHistory = () => (
  <div className="computing-history-container" style={{
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
      Historia de la Computación
    </h3>
    <p style={{
      textAlign: 'center',
      color: '#4A5568',
      marginBottom: '40px',
      fontSize: '1.05rem'
    }}>
      Desde los primeros mecanismos de cálculo hasta la era de la inteligencia artificial.
    </p>

    <div style={{ position: 'relative', paddingLeft: '40px' }}>
      {/* Vertical line */}
      <div style={{
        position: 'absolute',
        left: '15px',
        top: 0,
        bottom: 0,
        width: '2px',
        background: 'linear-gradient(180deg, #F97316, #252E42)'
      }} />

      {computingEvents.map((event, index) => (
        <div key={index} style={{
          position: 'relative',
          marginBottom: '30px',
          paddingLeft: '30px'
        }}>
          {/* Dot */}
          <div style={{
            position: 'absolute',
            left: '-32px',
            top: '20px',
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: '#F97316',
            border: '3px solid #0B0F1A',
            zIndex: 1
          }} />

          <div style={{
            background: '#1A2235',
            borderRadius: '12px',
            padding: '20px 24px',
            border: '1px solid #252E42',
            transition: 'all 0.3s ease'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
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
              fontSize: '1.1rem',
              fontWeight: 700,
              color: '#F8FAFC',
              fontFamily: 'var(--font-heading, Space Grotesk, sans-serif)'
            }}>
              {event.title}
            </h4>
            <p style={{
              margin: '0 0 8px 0',
              fontSize: '0.95rem',
              color: '#4A5568',
              lineHeight: 1.6
            }}>
              {event.description}
            </p>
            <span style={{
              fontSize: '0.78rem',
              fontWeight: 600,
              color: '#F97316',
              fontFamily: 'var(--font-mono, JetBrains Mono, monospace)',
              background: 'rgba(249, 115, 22, 0.1)',
              padding: '2px 10px',
              borderRadius: '6px'
            }}>
              👤 {event.pioneer}
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default ComputingHistory;
