import React from 'react';
import styles from './CSSSlides.module.css';

const IntroduccionCSSSlide = () => {
  return (
    <div className={styles.slide}>
      <h2>Introducción a CSS</h2>
      <p>CSS es como la decoración y pintura de una casa:</p>
      <ul>
        <li><strong>HTML</strong> → La estructura (paredes, techos, pisos)</li>
        <li><strong>CSS</strong> → Los colores, muebles y decoración</li>
        <li><strong>JavaScript</strong> → La electricidad y sistemas inteligentes</li>
      </ul>
      <p>CSS controla la presentación visual de tu página web: colores, fuentes, tamaños, posiciones y animaciones.</p>

      <div className={styles.highlight}>
        <h3>¿Qué aprenderás en este curso?</h3>
        <ul>
          <li>✅ Sintaxis básica de CSS</li>
          <li>✅ Selectores y especificidad</li>
          <li>✅ Propiedades fundamentales</li>
          <li>✅ Modelo de caja</li>
          <li>✅ Layouts modernos (Flexbox, Grid)</li>
          <li>✅ Diseño responsivo</li>
        </ul>
      </div>

      <div className={styles.example}>
        <h4>Analogía práctica:</h4>
        <p>Imagina que CSS es como el maquillaje y la ropa:</p>
        <ul>
          <li><strong>Colores</strong> → Maquillaje y tono de piel</li>
          <li><strong>Fuentes</strong> → Tipo de letra en las tarjetas de presentación</li>
          <li><strong>Tamaños</strong> → Talla de la ropa</li>
          <li><strong>Posiciones</strong> → Cómo acomodar los muebles</li>
        </ul>
      </div>
    </div>
  );
};

export default IntroduccionCSSSlide;
