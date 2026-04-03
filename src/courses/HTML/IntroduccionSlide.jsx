import React from 'react';
import styles from './HTMLSlides.module.css';

const IntroduccionSlide = () => {
  return (
    <div className={styles.slide}>
      <h2>Bienvenido al Mundo de la Web 🌍</h2>
      <p className={styles.lead}>Imagina que estás construyendo algo increíble. Toda gran obra requiere un plano y una estructura sólida. En la web, esa base es <strong>HTML5</strong>.</p>
      
      <div className={styles.analogyGrid}>
        <div className={styles.analogyCard}>
          <div className={styles.analogyIcon}>🦴</div>
          <h4>HTML: El Esqueleto</h4>
          <p>Define la estructura y el contenido. Sin él, no hay nada que mostrar.</p>
        </div>
        <div className={styles.analogyCard}>
          <div className={styles.analogyIcon}>🎨</div>
          <h4>CSS: La Piel</h4>
          <p>Añade estilo, colores y diseño. Hace que la estructura se vea hermosa.</p>
        </div>
        <div className={styles.analogyCard}>
          <div className={styles.analogyIcon}>🧠</div>
          <h4>JS: El Cerebro</h4>
          <p>Aporta interactividad y lógica. Hace que la página "piense" y reaccione.</p>
        </div>
      </div>

      <div className={styles.highlight}>
        <h3>¿Por qué HTML5?</h3>
        <p>No es solo texto; es la base de <strong>aplicaciones móviles, juegos y sitios complejos</strong>. Es un lenguaje semántico que ayuda a los buscadores (Google) y a las personas con discapacidad a entender tu contenido.</p>
      </div>

      <div className={styles.lessonPreview}>
        <span>Paso 1 de 8: Los Cimientos</span>
      </div>
    </div>
  );
};

export default IntroduccionSlide;
