import React from 'react';
import styles from './JSSlides.module.css';

const DOMJSSlide = () => {
  return (
    <div className={styles.slide}>
      <h2>Manipulación del DOM</h2>
      <p>El DOM (Document Object Model) es la representación de la estructura HTML como un árbol de objetos que puedes manipular con JavaScript.</p>

      <div className={styles.highlight}>
        <h3>🌳 El árbol del DOM:</h3>
        <ul>
          <li><code>document</code> → El documento completo</li>
          <li><code>document.documentElement</code> → Elemento &lt;html&gt;</li>
          <li><code>document.head</code> → Elemento &lt;head&gt;</li>
          <li><code>document.body</code> → Elemento &lt;body&gt;</li>
        </ul>
      </div>

      <div className={styles.example}>
        <h4>Acceso básico al DOM:</h4>
        <pre>
{`// Acceso al documento
console.log(document.title);          // Título de la página
console.log(document.URL);            // URL actual

// Modificar el título
document.title = "Nuevo Título";

// Acceso a elementos por ID
const titulo = document.getElementById("mi-titulo");
console.log(titulo.textContent);

// Acceso por clase
const parrafos = document.getElementsByClassName("texto");
console.log(parrafos[0].textContent);

// Acceso por etiqueta
const divs = document.getElementsByTagName("div");

// querySelector (recomendado)
const primerParrafo = document.querySelector("p");
const elementosAzules = document.querySelectorAll(".azul");`}
        </pre>
      </div>

      <div className={styles.highlight}>
        <h3>✏️ Modificación de contenido:</h3>
        <ul>
          <li><code>textContent</code> → Contenido de texto</li>
          <li><code>innerHTML</code> → Contenido HTML</li>
          <li><code>value</code> → Valor de inputs y textareas</li>
        </ul>
      </div>

      <div className={styles.example}>
        <h4>Modificando el DOM:</h4>
        <pre>
{`const titulo = document.querySelector("h1");

// Cambiar texto
titulo.textContent = "¡Hola desde JavaScript!";

// Cambiar HTML (cuidado con XSS)
const contenedor = document.querySelector(".contenido");
contenedor.innerHTML = "<p>Este es un <strong>párrafo</strong> nuevo</p>";

// Modificar estilos
titulo.style.color = "blue";
titulo.style.fontSize = "24px";

// Agregar clases CSS
titulo.classList.add("destacado");

// Remover clases CSS
titulo.classList.remove("oculto");

// Toggle (alternar)
titulo.classList.toggle("activo");

// Modificar atributos
const imagen = document.querySelector("img");
imagen.src = "nueva-imagen.jpg";
imagen.alt = "Imagen alternativa";

// Modificar value de inputs
const input = document.querySelector("input");
input.value = "Texto por defecto";`}
        </pre>
      </div>

      <div className={styles.highlight}>
        <h3>🏗️ Creación y manipulación de elementos:</h3>
        <pre>
{`// Crear nuevos elementos
const nuevoParrafo = document.createElement("p");
nuevoParrafo.textContent = "Este es un párrafo creado dinámicamente";

// Crear elemento con HTML
const divTemporal = document.createElement("div");
divTemporal.innerHTML = "<h2>Título</h2><p>Contenido</p>";
const tituloH2 = divTemporal.firstElementChild;

// Agregar elementos al DOM
const contenedor = document.querySelector(".contenedor");
contenedor.appendChild(nuevoParrafo);  // Agregar al final

// Insertar en posición específica
const primerHijo = contenedor.firstElementChild;
contenedor.insertBefore(nuevoParrafo, primerHijo);

// Remover elementos
const elementoARemover = document.querySelector(".borrar");
elementoARemover.remove();  // O elementoARemover.parentNode.removeChild(elementoARemover);`}
        </pre>
      </div>

      <div className={styles.highlight}>
        <h3>🏋️ Ejercicios prácticos</h3>
        <ol>
          <li><strong>Cambia título:</strong> Modifica el título de la página usando JavaScript</li>
          <li><strong>Contador de clics:</strong> Crea un botón que cuente cuántas veces se hace clic</li>
          <li><strong>Lista dinámica:</strong> Crea una lista que se modifique al hacer clic en botones</li>
          <li><strong>Cambiador de tema:</strong> Crea botones para cambiar colores usando classList</li>
        </ol>
      </div>

      <p><strong>⚠️ Importante:</strong> Manipular el DOM puede ser costoso. Usa técnicas eficientes y considera el rendimiento.</p>
    </div>
  );
};

export default DOMJSSlide;
