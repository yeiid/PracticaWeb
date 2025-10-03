import React from 'react';
import styles from './HTMLSlides.module.css';

const IntroduccionSlide = () => {
  return (
    <div className={styles.slide}>
      <h2>Introducción al Desarrollo Web</h2>
      <p>El desarrollo web es como construir una casa:</p>
      <ul>
        <li><strong>HTML</strong> → Los cimientos y estructura (habitaciones, puertas, ventanas)</li>
        <li><strong>CSS</strong> → La decoración y pintura (colores, muebles, estilo)</li>
        <li><strong>JavaScript</strong> → La electricidad y fontanería (interactividad, funcionalidades)</li>
      </ul>
      <p>En este curso aprenderás a construir tu primera "casa web" paso a paso, desde los cimientos hasta las funcionalidades avanzadas.</p>
      <div className={styles.highlight}>
        <h3>¿Qué esperar de este curso?</h3>
        <ul>
          <li>✅ Comprensión clara de los conceptos básicos</li>
          <li>✅ Ejemplos prácticos que puedes seguir</li>
          <li>✅ Analogías del mundo real para entender mejor</li>
          <li>✅ Recursos adicionales como el PDF de HTML5 incluido</li>
        </ul>
      </div>
    </div>
  );
};

export default IntroduccionSlide;
