import React from 'react';
import styles from './HTMLSlides.module.css';

const EtiquetasSlide = () => {
  return (
    <div className={styles.slide}>
      <h2>Etiquetas y Semántica HTML5 🏷️</h2>
      <p>No todas las etiquetas son iguales. El <strong>HTML Semántico</strong> le dice al navegador y a Google <em>qué significa</em> cada parte de tu página, no solo cómo se ve.</p>
      
      <div className={styles.tagGrid}>
        <div className={styles.tagCategory}>
          <h4>🏗️ Estructurales (Layout)</h4>
          <p>Organizan las grandes secciones:</p>
          <ul>
            <li><code>&lt;header&gt;</code>: Encabezado.</li>
            <li><code>&lt;nav&gt;</code>: Menú de navegación.</li>
            <li><code>&lt;main&gt;</code>: Contenido principal.</li>
            <li><code>&lt;footer&gt;</code>: Pié de página.</li>
          </ul>
        </div>
        
        <div className={styles.tagCategory}>
          <h4>📝 De Texto (Contenido)</h4>
          <ul>
            <li><code>&lt;h1&gt; - &lt;h6&gt;</code>: Jerarquía de títulos.</li>
            <li><code>&lt;p&gt;</code>: Párrafos estándar.</li>
            <li><code>&lt;strong&gt;</code>: Importancia (Negrita).</li>
            <li><code>&lt;a&gt;</code>: Enlaces (El alma de la web).</li>
          </ul>
        </div>
      </div>

      <div className={styles.warningBox}>
        <strong>⚠️ Regla de Oro:</strong> Usa solo UN <code>&lt;h1&gt;</code> por página. Es el título principal de tu documento.
      </div>

      <div className={styles.example}>
        <h4>Etiquetas de Auto-cierre (Void Elements):</h4>
        <p>Algunas etiquetas no envuelven contenido, por lo que no necesitan cierre: <code>&lt;img&gt;</code>, <code>&lt;br&gt;</code>, <code>&lt;hr&gt;</code> e <code>&lt;input&gt;</code>.</p>
      </div>

      <div className={styles.lessonPreview}>
        <span>Paso 3 de 8: Semántica y SEO</span>
      </div>
    </div>
  );
};

export default EtiquetasSlide;
