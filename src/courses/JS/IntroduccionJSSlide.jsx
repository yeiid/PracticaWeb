import React from 'react';
import styles from './JSSlides.module.css';

const IntroduccionJSSlide = () => {
  return (
    <div className={styles.slide}>
      <h2>Introducción a JavaScript</h2>
      <p>JavaScript es el lenguaje de programación que hace que las páginas web cobren vida:</p>
      <ul>
        <li><strong>HTML</strong> → La estructura (esqueleto)</li>
        <li><strong>CSS</strong> → El estilo (apariencia)</li>
        <li><strong>JavaScript</strong> → La funcionalidad (cerebro y sistema nervioso)</li>
      </ul>
      <p>JavaScript permite crear interactividad, responder a acciones del usuario y manipular el contenido dinámicamente.</p>

      <div className={styles.highlight}>
        <h3>¿Qué aprenderás en este curso?</h3>
        <ul>
          <li>✅ Sintaxis básica y variables</li>
          <li>✅ Operadores y expresiones</li>
          <li>✅ Estructuras de control (condicionales y bucles)</li>
          <li>✅ Funciones y alcance</li>
          <li>✅ Objetos y arrays</li>
          <li>✅ Manipulación del DOM</li>
          <li>✅ Manejo de eventos</li>
          <li>✅ Características modernas (ES6+)</li>
        </ul>
      </div>

      <div className={styles.example}>
        <h4>Analogía práctica:</h4>
        <p>Imagina que JavaScript es como el director de una película:</p>
        <ul>
          <li><strong>Variables</strong> → Los actores y utilería</li>
          <li><strong>Funciones</strong> → Las escenas y diálogos</li>
          <li><strong>Eventos</strong> → Las acciones que activan las escenas</li>
          <li><strong>DOM</strong> → El escenario donde todo sucede</li>
        </ul>
      </div>
    </div>
  );
};

export default IntroduccionJSSlide;
