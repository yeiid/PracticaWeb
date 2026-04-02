import React from 'react';
import styles from './HTMLSlides.module.css';

const EstructuraHTMLSlide = () => {
  return (
    <div className={styles.slide}>
      <h2>Estructura básica de HTML</h2>
      <pre>
{`<!DOCTYPE html>
<html>
  <head>
    <title>Mi página</title>
  </head>
  <body>
    <h1>Hola mundo</h1>
    <p>Este es un párrafo</p>
  </body>
</html>`}
      </pre>
      <div className={styles.highlight}>
        <h3>📋 Partes principales de un documento HTML:</h3>
        <ul>
          <li><code>&lt;!DOCTYPE html&gt;</code> → Declaración del tipo de documento</li>
          <li><code>&lt;html&gt;</code> → Elemento raíz que contiene todo el documento</li>
          <li><code>&lt;head&gt;</code> → Metadatos invisibles (título, estilos, scripts)</li>
          <li><code>&lt;body&gt;</code> → Contenido visible de la página</li>
        </ul>
      </div>
      <div className={styles.example}>
        <h4>Ejemplo práctico:</h4>
        <p>Imagina que HTML es como el esqueleto de un cuerpo humano:</p>
        <ul>
          <li><strong>DOCTYPE</strong> → Especifica que es un cuerpo humano (no un animal)</li>
          <li><strong>HTML</strong> → El cuerpo completo</li>
          <li><strong>HEAD</strong> → El cerebro y sistema nervioso (invisible pero controla todo)</li>
          <li><strong>BODY</strong> → La parte visible: brazos, piernas, torso</li>
        </ul>
      </div>
      <div className={styles.highlight}>
        <h3>🏋️ Ejercicios prácticos</h3>
        <ol>
          <li><strong>Crea tu primer documento:</strong> Abre un editor y escribe la estructura básica mostrada arriba</li>
          <li><strong>Experimenta con títulos:</strong> Cambia el h1 por h2, h3, etc. y observa la diferencia</li>
          <li><strong>Agrega párrafos:</strong> Escribe 3 párrafos diferentes dentro del body</li>
          <li><strong>Inspecciona el código:</strong> Abre el archivo en el navegador y usa F12 para ver la estructura</li>
        </ol>
      </div>
      <p><strong>💡 Recuerda:</strong> Siempre escribe HTML con sangría para mantener el código organizado y fácil de leer.</p>
    </div>
  );
};

export default EstructuraHTMLSlide;
