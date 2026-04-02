import React from 'react';
import styles from './CSSSlides.module.css';

const SelectoresCSSSlide = () => {
  return (
    <div className={styles.slide}>
      <h2>Selectores CSS</h2>
      <p>Los selectores son como direcciones que le dicen a CSS qué elementos estilizar.</p>

      <div className={styles.highlight}>
        <h3>📋 Tipos de selectores básicos:</h3>
        <ul>
          <li><code>*</code> → Selector universal (todos los elementos)</li>
          <li><code>elemento</code> → Por nombre de etiqueta (p, h1, div)</li>
          <li><code>.clase</code> → Por clase CSS</li>
          <li><code>#id</code> → Por ID único</li>
        </ul>
      </div>

      <div className={styles.highlight}>
        <h3>🔗 Selectores combinadores:</h3>
        <ul>
          <li><code>elemento elemento</code> → Descendiente</li>
          <li><code>elemento &gt; elemento</code> → Hijo directo</li>
          <li><code>elemento + elemento</code> → Hermano adyacente</li>
          <li><code>elemento ~ elemento</code> → Hermanos generales</li>
        </ul>
      </div>

      <div className={styles.example}>
        <h4>Ejemplos prácticos:</h4>
        <pre>
{`/* Por etiqueta */
h1 { color: blue; }

/* Por clase */
.destacado { font-weight: bold; }

/* Por ID */
#principal { font-size: 24px; }

/* Descendiente */
nav a { text-decoration: none; }

/* Hijo directo */
ul > li { list-style: none; }`}
        </pre>
      </div>

      <div className={styles.highlight}>
        <h3>🏋️ Ejercicios prácticos</h3>
        <ol>
          <li><strong>Crea estilos básicos:</strong> Aplica colores a diferentes elementos</li>
          <li><strong>Experimenta con clases:</strong> Crea clases reutilizables</li>
          <li><strong>Usa selectores combinados:</strong> Estiliza listas anidadas</li>
          <li><strong>Inspecciona elementos:</strong> Usa F12 para ver selectores aplicados</li>
        </ol>
      </div>
    </div>
  );
};

export default SelectoresCSSSlide;
