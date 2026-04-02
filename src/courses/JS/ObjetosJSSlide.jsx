import React from 'react';
import styles from './JSSlides.module.css';

const ObjetosJSSlide = () => {
  return (
    <div className={styles.slide}>
      <h2>Objetos en JavaScript</h2>
      <p>Los objetos son colecciones de propiedades y métodos que representan entidades del mundo real.</p>

      <div className={styles.highlight}>
        <h3>📦 Creación de objetos:</h3>
        <ul>
          <li><code>{'{}'}</code> → Objeto literal (forma más común)</li>
          <li><code>new Object()</code> → Constructor Object</li>
          <li><code>class</code> → Clases (ES6)</li>
        </ul>
      </div>

      <div className={styles.example}>
        <h4>Objeto literal:</h4>
        <pre>
{`const persona = {
  nombre: "Ana",
  edad: 25,
  ciudad: "Madrid",
  profesion: "Desarrolladora",
  hobbies: ["leer", "programar", "viajar"],
  saludar: function() {
    return "Hola, soy " + this.nombre;
  }
};

// Accediendo a propiedades
console.log(persona.nombre);        // "Ana"
console.log(persona.edad);          // 25
console.log(persona.hobbies[0]);    // "leer"

// Llamando métodos
console.log(persona.saludar());     // "Hola, soy Ana"

// Agregando nuevas propiedades
persona.email = "ana@email.com";
console.log(persona.email);         // "ana@email.com"

// Modificando propiedades
persona.edad = 26;
console.log(persona.edad);          // 26`}
        </pre>
      </div>

      <div className={styles.highlight}>
        <h3>🔧 Clases (ES6):</h3>
        <pre>
{`class Persona {
  constructor(nombre, edad) {
    this.nombre = nombre;
    this.edad = edad;
  }

  saludar() {
    return \`Hola, soy \${this.nombre}\`;
  }

  cumplirAnos() {
    this.edad++;
  }
}

// Creando instancias
const ana = new Persona("Ana", 25);
const carlos = new Persona("Carlos", 30);

console.log(ana.saludar());     // "Hola, soy Ana"
console.log(carlos.saludar());  // "Hola, soy Carlos"

ana.cumplirAnos();
console.log(ana.edad);          // 26`}
        </pre>
      </div>

      <div className={styles.highlight}>
        <h3>🔍 Iterando sobre objetos:</h3>
        <pre>
{`const coche = {
  marca: "Toyota",
  modelo: "Corolla",
  color: "azul",
  anio: 2020
};

// for...in para propiedades
for (let propiedad in coche) {
  console.log(propiedad + ": " + coche[propiedad]);
}

// Object.keys() - solo las claves
console.log(Object.keys(coche));

// Object.values() - solo los valores
console.log(Object.values(coche));

// Object.entries() - pares clave-valor
console.log(Object.entries(coche));`}
        </pre>
      </div>

      <div className={styles.highlight}>
        <h3>🏋️ Ejercicios prácticos</h3>
        <ol>
          <li><strong>Objeto libro:</strong> Crea un objeto que represente un libro con título, autor, páginas y género</li>
          <li><strong>Objeto mascota:</strong> Crea un objeto mascota con métodos para comer, jugar y dormir</li>
          <li><strong>Objeto calculadora:</strong> Crea un objeto con métodos para operaciones matemáticas</li>
          <li><strong>Iteración:</strong> Itera sobre un objeto producto e imprime sus propiedades</li>
        </ol>
      </div>

      <p><strong>💡 Tip:</strong> Usa <code>for...in</code> para iterar sobre propiedades y <code>Object.keys/values/entries</code> para obtener arrays manipulables.</p>
    </div>
  );
};

export default ObjetosJSSlide;
