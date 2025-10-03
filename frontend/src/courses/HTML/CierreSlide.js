import React from 'react';
import styles from './HTMLSlides.module.css';

const CierreSlide = () => {
  return (
    <div className={styles.slide}>
      <h2>¡Felicitaciones!</h2>
      <div className={styles.highlight}>
        <h3>🎉 ¡Lo que has aprendido!</h3>
        <ul>
          <li>✅ Entiendes qué es el desarrollo web</li>
          <li>✅ Conoces la diferencia entre Frontend y Backend</li>
          <li>✅ Dominas los 3 pilares: HTML, CSS y JavaScript</li>
          <li>✅ Sabes qué herramientas necesitas</li>
          <li>✅ Entiendes la estructura básica de HTML</li>
          <li>✅ Conoces las etiquetas fundamentales</li>
        </ul>
      </div>
      <div className={styles.example}>
        <h4>🚀 ¿Qué sigue?</h4>
        <p>En el próximo nivel profundizaremos en:</p>
        <ul>
          <li><strong>HTML Avanzado:</strong> Formularios, multimedia, semántica</li>
          <li><strong>CSS Profesional:</strong> Flexbox, Grid, animaciones</li>
          <li><strong>JavaScript Básico:</strong> Variables, funciones, eventos</li>
          <li><strong>Proyectos Prácticos:</strong> Construir páginas reales</li>
        </ul>
      </div>
      <p><em>¡Felicitaciones por completar el nivel básico! Estás listo para el siguiente desafío.</em></p>
    </div>
  );
};

export default CierreSlide;
