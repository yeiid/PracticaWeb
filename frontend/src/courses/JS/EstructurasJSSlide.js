import React from 'react';
import styles from './JSSlides.module.css';

const EstructurasJSSlide = () => {
  return (
    <div className={styles.slide}>
      <h2>Estructuras de Control</h2>
      <p>Las estructuras de control dirigen el flujo de ejecución del programa.</p>

      <div className={styles.highlight}>
        <h3>🔀 Condicionales - if...else:</h3>
        <ul>
          <li><code>if</code> → Ejecuta código si la condición es verdadera</li>
          <li><code>else</code> → Ejecuta código si la condición es falsa</li>
          <li><code>else if</code> → Múltiples condiciones encadenadas</li>
        </ul>
      </div>

      <div className={styles.highlight}>
        <h3>🔄 Bucles - Loops:</h3>
        <ul>
          <li><code>for</code> → Bucle controlado por contador</li>
          <li><code>while</code> → Bucle mientras la condición sea verdadera</li>
          <li><code>do...while</code> → Bucle que se ejecuta al menos una vez</li>
          <li><code>for...of</code> → Iterar sobre arrays (ES6)</li>
          <li><code>for...in</code> → Iterar sobre propiedades de objetos</li>
        </ul>
      </div>

      <div className={styles.example}>
        <h4>Ejemplos prácticos:</h4>
        <pre>
{`// Condicionales
let edad = 18;

if (edad >= 18) {
  console.log("Eres mayor de edad");
} else if (edad >= 13) {
  console.log("Eres adolescente");
} else {
  console.log("Eres menor de edad");
}

// Bucle for
for (let i = 1; i <= 5; i++) {
  console.log("Número: " + i);
}

// Bucle while
let contador = 0;
while (contador < 3) {
  console.log("Contador: " + contador);
  contador++;
}

// Bucle for...of (arrays)
let frutas = ["manzana", "banana", "naranja"];
for (let fruta of frutas) {
  console.log(fruta);
}`}
        </pre>
      </div>

      <div className={styles.highlight}>
        <h3>🎯 Switch Statement:</h3>
        <pre>
{`let dia = "lunes";

switch (dia) {
  case "lunes":
    console.log("Inicio de semana");
    break;
  case "viernes":
    console.log("¡Fin de semana!");
    break;
  case "sabado":
  case "domingo":
    console.log("Día de descanso");
    break;
  default:
    console.log("Día normal");
}`}
        </pre>
      </div>

      <div className={styles.highlight}>
        <h3>🏋️ Ejercicios prácticos</h3>
        <ol>
          <li><strong>Clasificador de edad:</strong> Crea un programa que clasifique por rangos de edad</li>
          <li><strong>Tabla de multiplicar:</strong> Usa un bucle for para mostrar la tabla del 5</li>
          <li><strong>Contador regresivo:</strong> Crea una cuenta regresiva del 10 al 1</li>
          <li><strong>Iterador de arrays:</strong> Recorre un array de colores e imprímelos</li>
        </ol>
      </div>

      <p><strong>⚠️ Importante:</strong> No olvides usar <code>break</code> en switch para evitar que se ejecuten todos los casos.</p>
    </div>
  );
};

export default EstructurasJSSlide;
