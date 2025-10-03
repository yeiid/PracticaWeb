import React from 'react';
import styles from './JSSlides.module.css';

const ArraysJSSlide = () => {
  return (
    <div className={styles.slide}>
      <h2>Arrays en JavaScript</h2>
      <p>Los arrays son estructuras de datos que almacenan múltiples valores en una sola variable.</p>

      <div className={styles.highlight}>
        <h3>📋 Creación de arrays:</h3>
        <ul>
          <li><code>[]</code> → Array literal (forma más común)</li>
          <li><code>new Array()</code> → Constructor Array</li>
          <li><code>Array.of()</code> → Crear array con valores específicos</li>
          <li><code>Array.from()</code> → Crear array desde un objeto iterable</li>
        </ul>
      </div>

      <div className={styles.example}>
        <h4>Formas de crear arrays:</h4>
        <pre>
{`// Array literal
const frutas = ["manzana", "banana", "naranja"];

// Constructor Array
const numeros = new Array(1, 2, 3, 4, 5);

// Array.of()
const colores = Array.of("rojo", "verde", "azul");

// Array.from()
const letras = Array.from("Hola"); // ["H", "o", "l", "a"]

// Accediendo a elementos
console.log(frutas[0]);    // "manzana"
console.log(numeros[2]);    // 3

// Longitud del array
console.log(frutas.length); // 3

// Modificando elementos
frutas[1] = "pera";
console.log(frutas); // ["manzana", "pera", "naranja"]`}
        </pre>
      </div>

      <div className={styles.highlight}>
        <h3>🔧 Métodos de arrays:</h3>
        <ul>
          <li><code>push()</code> → Agregar al final</li>
          <li><code>pop()</code> → Remover del final</li>
          <li><code>unshift()</code> → Agregar al inicio</li>
          <li><code>shift()</code> → Remover del inicio</li>
          <li><code>splice()</code> → Agregar/remover en posición específica</li>
          <li><code>slice()</code> → Copiar porción del array</li>
        </ul>
      </div>

      <div className={styles.example}>
        <h4>Ejemplos de métodos:</h4>
        <pre>
{`const tareas = ["estudiar", "hacer ejercicio"];

// Agregar elementos
tareas.push("leer");           // ["estudiar", "hacer ejercicio", "leer"]
tareas.unshift("desayunar");   // ["desayunar", "estudiar", "hacer ejercicio", "leer"]

// Remover elementos
tareas.pop();                  // Remueve "leer"
tareas.shift();                // Remueve "desayunar"

// splice() - posición, elementos a remover, elementos a agregar
tareas.splice(1, 1, "meditar", "caminar");
// Resultado: ["estudiar", "meditar", "caminar", "hacer ejercicio"]

// slice() - crea una copia superficial
const primerasDos = tareas.slice(0, 2); // ["estudiar", "meditar"]`}
        </pre>
      </div>

      <div className={styles.highlight}>
        <h3>🔍 Iteración de arrays:</h3>
        <pre>
{`const numeros = [1, 2, 3, 4, 5];

// for tradicional
for (let i = 0; i < numeros.length; i++) {
  console.log(numeros[i]);
}

// for...of (ES6)
for (let numero of numeros) {
  console.log(numero);
}

// forEach() - ejecuta función por cada elemento
numeros.forEach(function(numero, indice) {
  console.log(\`Elemento \${indice}: \${numero}\`);
});

// map() - crea nuevo array transformando cada elemento
const duplicados = numeros.map(n => n * 2); // [2, 4, 6, 8, 10]

// filter() - crea array con elementos que pasan el test
const pares = numeros.filter(n => n % 2 === 0); // [2, 4]

// find() - encuentra primer elemento que pasa el test
const mayorQueTres = numeros.find(n => n > 3); // 4`}
        </pre>
      </div>

      <div className={styles.highlight}>
        <h3>🏋️ Ejercicios prácticos</h3>
        <ol>
          <li><strong>Lista de compras:</strong> Crea un array de compras y agrega/remueve elementos</li>
          <li><strong>Filtrado:</strong> Crea un array de números y filtra solo los pares</li>
          <li><strong>Transformación:</strong> Usa map() para duplicar todos los elementos de un array</li>
          <li><strong>Búsqueda:</strong> Crea un array de objetos persona y encuentra uno por nombre</li>
        </ol>
      </div>

      <p><strong>💡 Tip:</strong> Los métodos funcionales como <code>map()</code>, <code>filter()</code> y <code>reduce()</code> son más declarativos y recomendados en ES6+.</p>
    </div>
  );
};

export default ArraysJSSlide;
