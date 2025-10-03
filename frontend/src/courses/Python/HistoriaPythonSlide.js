import React from 'react';
import styles from './PythonSlides.module.css';

const HistoriaPythonSlide = () => {
  return (
    <div className={styles.slide}>
      <h2>Historia de Python</h2>
      <p>Python tiene una rica historia que comienza a finales de los años 80.</p>

      <div className={styles.highlight}>
        <h3>🎭 Los Orígenes</h3>
        <ul>
          <li><strong>1989</strong> - Guido van Rossum comienza el desarrollo</li>
          <li><strong>Centro para las Matemáticas y la Informática</strong> en Ámsterdam</li>
          <li><strong>Inspirado en</strong> ABC, un lenguaje educativo anterior</li>
          <li><strong>Nombre</strong> inspirado en "Monty Python's Flying Circus"</li>
        </ul>
      </div>

      <div className={styles.example}>
        <h4>📅 Cronología de Versiones Importantes:</h4>
        <ul>
          <li><strong>1991</strong> - Python 0.9.0 (primera versión pública)</li>
          <li><strong>1994</strong> - Python 1.0 (primera versión oficial)</li>
          <li><strong>2000</strong> - Python 2.0 (cambios significativos)</li>
          <li><strong>2008</strong> - Python 3.0 (cambio de versión mayor)</li>
          <li><strong>2010</strong> - Python 2.7 (última versión de la rama 2.x)</li>
          <li><strong>2020</strong> - Python 3.8 (actualmente muy usado)</li>
          <li><strong>2023</strong> - Python 3.12 (versión más reciente)</li>
        </ul>
      </div>

      <div className={styles.highlight}>
        <h3>👑 Guido van Rossum - El Benevolente Dictador Vitalicio</h3>
        <ul>
          <li><strong>Holandés</strong> nacido en 1956</li>
          <li><strong>Desarrollador principal</strong> hasta 2018</li>
          <li><strong>Filosofía</strong> de "decisiones tomadas por consenso"</li>
          <li><strong>Actualmente</strong> trabaja en Microsoft en el equipo de Python</li>
        </ul>
      </div>

      <div className={styles.example}>
        <h4>🏆 Premios y Reconocimientos:</h4>
        <ul>
          <li><strong>2001</strong> - Premio a Guido por contribución al software libre</li>
          <li><strong>2018</strong> - Guido deja el rol de BDFL</li>
          <li><strong>2021</strong> - Guido recibe el premio CWI</li>
          <li><strong>Comunidad</strong> mantiene el espíritu colaborativo</li>
        </ul>
      </div>

      <div className={styles.highlight}>
        <h3>📈 Evolución del Lenguaje</h3>
        <ul>
          <li><strong>Python 2 vs 3</strong> - Transición más grande en la historia</li>
          <li><strong>Mejoras continuas</strong> - Nueva versión cada año</li>
          <li><strong>Comunidad activa</strong> - Miles de contribuyentes</li>
          <li><strong>Estándarización</strong> - PEP (Python Enhancement Proposals)</li>
        </ul>
      </div>

      <div className={styles.example}>
        <h4>🌟 Momentos Clave:</h4>
        <ul>
          <li><strong>2004</strong> - Django (framework web) impulsa adopción</li>
          <li><strong>2010s</strong> - Boom del análisis de datos con Python</li>
          <li><strong>2015</strong> - Python se convierte en el lenguaje más popular</li>
          <li><strong>2020s</strong> - Dominio en IA y machine learning</li>
        </ul>
      </div>

      <p><strong>💡 Curiosidad:</strong> El logo de Python son dos serpientes porque "python" significa "serpiente pitón" en inglés.</p>
    </div>
  );
};

export default HistoriaPythonSlide;
