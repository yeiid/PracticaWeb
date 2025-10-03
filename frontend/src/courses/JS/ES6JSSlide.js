import React from 'react';
import styles from './JSSlides.module.css';

const ES6JSSlide = () => {
  return (
    <div className={styles.slide}>
      <h2>ES6+ Características Modernas</h2>
      <p>ES6 (ECMAScript 2015) y versiones posteriores introdujeron muchas características que hacen JavaScript más poderoso y expresivo.</p>

      <div className={styles.highlight}>
        <h3>🔥 Arrow Functions:</h3>
        <p>Sintaxis más corta para funciones, mantienen el contexto del <code>this</code>:</p>
        <pre>
{`// Antes (ES5)
const suma = function(a, b) {
  return a + b;
};

// Después (ES6+)
const suma = (a, b) => a + b;
const saludo = nombre => \`Hola \${nombre}\`;

// Con múltiples líneas
const operacion = (a, b) => {
  const resultado = a + b;
  return resultado * 2;
};`}
        </pre>
      </div>

      <div className={styles.highlight}>
        <h3>📝 Template Literals:</h3>
        <p>Mejor sintaxis para strings con interpolación y múltiples líneas:</p>
        <pre>
{`const nombre = "Ana";
const edad = 25;

// Antes
const saludo = "Hola, " + nombre + ". Tienes " + edad + " años.";

// Después (ES6+)
const saludo = \`Hola, \${nombre}. Tienes \${edad} años.\`;
const poema = \`
  En un lugar de la Mancha,
  de cuyo nombre no quiero acordarme...
\`;`}
        </pre>
      </div>

      <div className={styles.highlight}>
        <h3>🔄 Destructuring:</h3>
        <p>Extraer valores de arrays y objetos de forma más elegante:</p>
        <pre>
{`// Arrays
const numeros = [1, 2, 3, 4];
const [primero, segundo, ...resto] = numeros;
console.log(primero);  // 1
console.log(resto);    // [3, 4]

// Objetos
const persona = { nombre: "Ana", edad: 25, ciudad: "Madrid" };
const { nombre, edad, ciudad } = persona;
console.log(ciudad);   // "Madrid"

// Parámetros de función
function mostrarInfo({ nombre, edad }) {
  console.log(\`\${nombre} tiene \${edad} años\`);
}
mostrarInfo(persona);`}
        </pre>
      </div>

      <div className={styles.highlight}>
        <h3>📦 Modules (import/export):</h3>
        <p>Organizar código en módulos reutilizables:</p>
        <pre>
{`// math.js
export const suma = (a, b) => a + b;
export const PI = 3.14159;

// main.js
import { suma, PI } from './math.js';
import * as MathUtils from './math.js';

console.log(suma(5, 3));        // 8
console.log(MathUtils.PI);      // 3.14159`}
        </pre>
      </div>

      <div className={styles.highlight}>
        <h3>🏗️ Classes mejoradas:</h3>
        <pre>
{`class Persona {
  constructor(nombre, edad) {
    this.nombre = nombre;
    this.edad = edad;
  }

  saludar() {
    return \`Hola, soy \${this.nombre}\`;
  }

  // Método estático
  static especie() {
    return "Humano";
  }
}

const ana = new Persona("Ana", 25);
console.log(ana.saludar());           // "Hola, soy Ana"
console.log(Persona.especie());       // "Humano"

// Herencia
class Estudiante extends Persona {
  constructor(nombre, edad, grado) {
    super(nombre, edad);
    this.grado = grado;
  }

  estudiar() {
    return \`\${this.nombre} está estudiando \${this.grado}\`;
  }
}

const carlos = new Estudiante("Carlos", 20, "Ingeniería");
console.log(carlos.estudiar());       // "Carlos está estudiando Ingeniería"`}
        </pre>
      </div>

      <div className={styles.highlight}>
        <h3>🏋️ Ejercicios prácticos</h3>
        <ol>
          <li><strong>Arrow functions:</strong> Convierte funciones tradicionales a arrow functions</li>
          <li><strong>Template literals:</strong> Crea plantillas para emails o mensajes personalizados</li>
          <li><strong>Destructuring:</strong> Extrae propiedades de objetos anidados</li>
          <li><strong>Classes:</strong> Crea una clase Animal con subclases Perro y Gato</li>
        </ol>
      </div>

      <p><strong>🚀 Tip:</strong> Estas características hacen el código más legible y mantenible. ¡Úsalas!</p>
    </div>
  );
};

export default ES6JSSlide;
