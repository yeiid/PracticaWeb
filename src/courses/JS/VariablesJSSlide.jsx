import React from 'react';
import styles from './JSSlides.module.css';

const VariablesJSSlide = () => {
  return (
    <div className={styles.slide}>
      <h2>Variables y Tipos de Datos</h2>
      <p>Las variables son contenedores que almacenan información. JavaScript tiene diferentes tipos de datos:</p>

      <div className={styles.highlight}>
        <h3>📝 Tipos de datos primitivos:</h3>
        <ul>
          <li><code>string</code> → Texto: <code>"Hola Mundo"</code>, <code>'JavaScript'</code></li>
          <li><code>number</code> → Números: <code>42</code>, <code>3.14</code>, <code>Infinity</code></li>
          <li><code>boolean</code> → Verdadero/falso: <code>true</code>, <code>false</code></li>
          <li><code>undefined</code> → Valor no definido</li>
          <li><code>null</code> → Valor nulo intencionalmente</li>
        </ul>
      </div>

      <div className={styles.example}>
        <h4>Ejemplos de declaración de variables:</h4>
        <pre>
{`// Declaración con var (antigua)
var nombre = "Ana";

// Declaración con let (recomendada)
let edad = 25;

// Declaración con const (constante)
const pi = 3.14159;

// Tipos de datos
let texto = "Hola";        // string
let numero = 42;          // number
let esMayor = true;       // boolean
let noDefinido;           // undefined
let vacio = null;         // null`}
        </pre>
      </div>

      <div className={styles.highlight}>
        <h3>🏋️ Ejercicios prácticos</h3>
        <ol>
          <li><strong>Crea variables:</strong> Declara variables para tu nombre, edad y ciudad</li>
          <li><strong>Experimenta con tipos:</strong> Usa <code>typeof</code> para ver el tipo de diferentes valores</li>
          <li><strong>Mezcla tipos:</strong> ¿Qué pasa cuando sumas un string con un número?</li>
          <li><strong>Constantes:</strong> Intenta cambiar el valor de una constante (¿qué error obtienes?)</li>
        </ol>
      </div>

      <p><strong>💡 Tip:</strong> Usa <code>let</code> para variables que cambien y <code>const</code> para valores que no cambien.</p>
    </div>
  );
};

export default VariablesJSSlide;
