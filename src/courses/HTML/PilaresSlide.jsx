import React from 'react';
import styles from './HTMLSlides.module.css';

const PilaresSlide = () => {
  return (
    <div className={styles.slide}>
      <h2>Los 3 pilares del Frontend</h2>
      <div className={styles.highlight}>
        <h3>🏗️ HTML - El Esqueleto</h3>
        <ul>
          <li>Define la <strong>estructura</strong> de la página</li>
          <li>Organiza el contenido en secciones lógicas</li>
          <li>Proporciona el marco para que otros elementos se conecten</li>
          <li>Sin HTML, no hay página web</li>
        </ul>
      </div>
      <div className={styles.highlight}>
        <h3>🎨 CSS - La Apariencia</h3>
        <ul>
          <li>Controla <strong>colores, fuentes, tamaños</strong></li>
          <li>Define el <strong>layout</strong> y posicionamiento</li>
          <li>Crea animaciones y efectos visuales</li>
          <li>Mejora la experiencia del usuario</li>
        </ul>
      </div>
      <div className={styles.highlight}>
        <h3>⚡ JavaScript - La Interactividad</h3>
        <ul>
          <li>Agrega <strong>comportamiento dinámico</strong></li>
          <li>Responde a <strong>acciones del usuario</strong></li>
          <li>Manipula el contenido en tiempo real</li>
          <li>Conecta con servidores y APIs</li>
        </ul>
      </div>
      <div className={styles.example}>
        <h4>Analogía completa del cuerpo humano:</h4>
        <ul>
          <li><strong>HTML</strong> → Esqueleto + órganos vitales (estructura que mantiene todo unido)</li>
          <li><strong>CSS</strong> → Piel, cabello, ropa (lo que hace que luzca bien)</li>
          <li><strong>JavaScript</strong> → Sistema nervioso + cerebro (lo que hace que responda y funcione)</li>
        </ul>
        <p><em>💡 Nota: Aunque cada tecnología tiene su función específica, trabajan juntas como un equipo perfectamente coordinado.</em></p>
      </div>
      <p><strong>🔄 Secuencia de carga:</strong> HTML → CSS → JavaScript (se cargan en este orden)</p>
    </div>
  );
};

export default PilaresSlide;
