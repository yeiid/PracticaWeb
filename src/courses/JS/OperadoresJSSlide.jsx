import React from 'react';
import styles from './JSSlides.module.css';

const OperadoresJSSlide = () => {
  return (
    <div className={styles.slide}>
      <h2>Operadores en JavaScript</h2>
      <p>Los operadores permiten realizar operaciones con valores y variables.</p>

      <div className={styles.highlight}>
        <h3>🔢 Operadores aritméticos:</h3>
        <ul>
          <li><code>+</code> → Suma: <code>5 + 3 = 8</code></li>
          <li><code>-</code> → Resta: <code>10 - 4 = 6</code></li>
          <li><code>*</code> → Multiplicación: <code>3 * 4 = 12</code></li>
          <li><code>/</code> → División: <code>15 / 3 = 5</code></li>
          <li><code>%</code> → Módulo (resto): <code>7 % 3 = 1</code></li>
          <li><code>**</code> → Potencia: <code>2 ** 3 = 8</code></li>
        </ul>
      </div>

      <div className={styles.highlight}>
        <h3>⚖️ Operadores de comparación:</h3>
        <ul>
          <li><code>===</code> → Igualdad estricta: <code>5 === "5" = false</code></li>
          <li><code>!==</code> → Desigualdad estricta: <code>5 !== "5" = true</code></li>
          <li><code>&gt;</code>, <code>&lt;</code>, <code>&gt;=</code>, <code>&lt;=</code> → Mayor, menor, mayor o igual, menor o igual</li>
        </ul>
      </div>

      <div className={styles.highlight}>
        <h3>🔗 Operadores lógicos:</h3>
        <ul>
          <li><code>&&</code> → AND lógico: <code>true && false = false</code></li>
          <li><code>||</code> → OR lógico: <code>true || false = true</code></li>
          <li><code>!</code> → NOT lógico: <code>!true = false</code></li>
        </ul>
      </div>

      <div className={styles.example}>
        <h4>Ejemplos prácticos:</h4>
        <pre>
{`// Operaciones aritméticas
let suma = 10 + 5;        // 15
let resta = 20 - 8;       // 12
let multiplicacion = 4 * 3; // 12
let division = 16 / 4;    // 4
let modulo = 17 % 3;      // 2
let potencia = 2 ** 3;    // 8

// Comparaciones
let esMayor = 10 > 5;     // true
let esIgual = 5 === 5;    // true
let esDiferente = 5 !== "5"; // true

// Lógicos
let ambosVerdaderos = true && true;   // true
let alMenosUno = true || false;       // true
let negacion = !true;                  // false`}
        </pre>
      </div>

      <div className={styles.highlight}>
        <h3>🏋️ Ejercicios prácticos</h3>
        <ol>
          <li><strong>Calculadora básica:</strong> Crea variables con números y realiza todas las operaciones aritméticas</li>
          <li><strong>Comparaciones:</strong> Compara tu edad con la de un familiar usando diferentes operadores</li>
          <li><strong>Lógica:</strong> Crea expresiones lógicas que combinen condiciones</li>
          <li><strong>Concatenación:</strong> Usa el operador + para unir strings y números</li>
        </ol>
      </div>
    </div>
  );
};

export default OperadoresJSSlide;
