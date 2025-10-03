import React from 'react';
import styles from './HTMLSlides.module.css';

const EtiquetasSlide = () => {
  return (
    <div className={styles.slide}>
      <h2>Etiquetas básicas</h2>
      <div className={styles.highlight}>
        <h3>🏗️ Etiquetas de estructura (bloques):</h3>
        <ul>
          <li><code>&lt;h1&gt; a &lt;h6&gt;</code> → Títulos jerárquicos (h1 es el más importante)</li>
          <li><code>&lt;p&gt;</code> → Párrafos de texto</li>
          <li><code>&lt;div&gt;</code> → Contenedor genérico (como una caja invisible)</li>
          <li><code>&lt;section&gt;</code> → Sección temática de contenido</li>
        </ul>
      </div>
      <div className={styles.highlight}>
        <h3>🔗 Etiquetas de texto e inline:</h3>
        <ul>
          <li><code>&lt;a href=&quot;&quot;&gt;</code> → Enlaces hipertexto</li>
          <li><code>&lt;strong&gt;</code> → Texto importante (aparece en negrita)</li>
          <li><code>&lt;em&gt;</code> → Texto enfatizado (aparece en cursiva)</li>
          <li><code>&lt;span&gt;</code> → Contenedor inline para estilos específicos</li>
        </ul>
      </div>
      <div className={styles.example}>
        <h4>Analogía práctica:</h4>
        <p>Las etiquetas HTML son como piezas de LEGO:</p>
        <ul>
          <li><strong>Etiquetas de bloque</strong> → Piezas grandes (base, paredes)</li>
          <li><strong>Etiquetas inline</strong> → Piezas pequeñas (decoración, detalles)</li>
          <li><strong>Atributos</strong> → Instrucciones en la caja (color, tamaño, posición)</li>
        </ul>
      </div>
      <div className={styles.highlight}>
        <h3>🏋️ Ejercicios prácticos</h3>
        <ol>
          <li><strong>Crea una lista:</strong> Usa las etiquetas de bloque para hacer una lista de tus comidas favoritas</li>
          <li><strong>Agrega enlaces:</strong> Convierte algunos elementos en enlaces usando la etiqueta &lt;a&gt;</li>
          <li><strong>Experimenta con texto:</strong> Usa &lt;strong&gt; y &lt;em&gt; en diferentes párrafos</li>
          <li><strong>Crea secciones:</strong> Organiza tu contenido en &lt;section&gt; y &lt;article&gt;</li>
        </ol>
      </div>
      <p><strong>💡 Recuerda:</strong> Todas las etiquetas de apertura necesitan una de cierre, excepto las auto-cierres como <code>&lt;img&gt;</code> o <code>&lt;br&gt;</code>.</p>
    </div>
  );
};

export default EtiquetasSlide;
