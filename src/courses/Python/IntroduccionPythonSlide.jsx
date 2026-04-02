import React from 'react';
import styles from './PythonSlides.module.css';

const IntroduccionPythonSlide = () => {
  return (
    <div className={styles.slide}>
      <h2>Introducción a Python</h2>
      <p>Python es uno de los lenguajes de programación más populares y versátiles del mundo.</p>

      <div className={styles.highlight}>
        <h3>🐍 ¿Qué es Python?</h3>
        <ul>
          <li><strong>Lenguaje de programación</strong> de alto nivel</li>
          <li><strong>Interpretado</strong> - no necesita compilación</li>
          <li><strong>Multiparadigma</strong> - soporta múltiples estilos de programación</li>
          <li><strong>Sintaxis clara</strong> - fácil de leer y escribir</li>
          <li><strong>Multiplataforma</strong> - funciona en Windows, macOS, Linux</li>
        </ul>
      </div>

      <div className={styles.example}>
        <h4>📝 Filosofía de Python:</h4>
        <blockquote>
          "Explícito es mejor que implícito"<br />
          "Simple es mejor que complejo"<br />
          "La legibilidad cuenta"<br />
          "Si una implementación es difícil de explicar, es una mala idea"
        </blockquote>
        <cite>- Tim Peters, "El Zen de Python"</cite>
      </div>

      <div className={styles.highlight}>
        <h3>🚀 ¿Por qué Python?</h3>
        <ul>
          <li><strong>Fácil de aprender</strong> - Ideal para principiantes</li>
          <li><strong>Comunidad enorme</strong> - Miles de librerías disponibles</li>
          <li><strong>Versátil</strong> - Web, datos, IA, automatización, etc.</li>
          <li><strong>Demandado</strong> - Uno de los lenguajes más solicitados</li>
          <li><strong>Productivo</strong> - Menos código para más funcionalidad</li>
        </ul>
      </div>

      <div className={styles.example}>
        <h4>💼 Campos donde se usa Python:</h4>
        <ul>
          <li><strong>Desarrollo Web</strong> (Django, Flask, FastAPI)</li>
          <li><strong>Análisis de Datos</strong> (Pandas, NumPy, Matplotlib)</li>
          <li><strong>Inteligencia Artificial</strong> (TensorFlow, PyTorch, Scikit-learn)</li>
          <li><strong>Automatización</strong> (Scripts, bots, testing)</li>
          <li><strong>Desarrollo de Juegos</strong> (Pygame, Panda3D)</li>
          <li><strong>Ciencia</strong> (Investigación, simulaciones)</li>
        </ul>
      </div>

      <p><strong>🎯 En este curso aprenderás:</strong> Desde los fundamentos hasta herramientas avanzadas, incluyendo las librerías más importantes y cómo instalarlas.</p>
    </div>
  );
};

export default IntroduccionPythonSlide;
