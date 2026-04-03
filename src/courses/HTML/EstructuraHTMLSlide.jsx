import React from 'react';
import styles from './HTMLSlides.module.css';

const EstructuraHTMLSlide = () => {
  return (
    <div className={styles.slide}>
      <h2>La Anatomía de una Página Web 🏗️</h2>
      <p>Todo documento HTML5 sigue una estructura jerárquica estricta. Imagina que el <code>&lt;head&gt;</code> es el cerebro (lo que la página sabe) y el <code>&lt;body&gt;</code> es el cuerpo (lo que el usuario ve).</p>
      
      <div className={styles.codeContainer}>
        <div className={styles.codeHeader}>
          <span className={styles.codeDot}></span>
          <span className={styles.codeDot}></span>
          <span className={styles.codeDot}></span>
          <span className={styles.codeTitle}>index.html</span>
        </div>
        <pre className={styles.codeBlock}>
{`<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi Gran Proyecto</title>
</head>
<body>
    <h1>¡Hola, Futuro Desarrollador!</h1>
    <p>HTML es el punto de partida.</p>
</body>
</html>`}
        </pre>
      </div>

      <div className={styles.infoGrid}>
        <div className={styles.infoCard}>
          <h4>🧠 El Head (Invisible)</h4>
          <ul>
            <li><code>charset="UTF-8"</code>: Permite tildes y caracteres especiales.</li>
            <li><code>viewport</code>: Hace que tu web se vea bien en móviles (Responsive).</li>
            <li><code>title</code>: Lo que aparece en la pestaña del navegador.</li>
          </ul>
        </div>
        <div className={styles.infoCard}>
          <h4>💪 El Body (Visible)</h4>
          <p>Aquí va todo lo que tus usuarios consumirán: imágenes, textos, botones y videos.</p>
        </div>
      </div>

      <div className={styles.proTip}>
        <strong>💡 Pro Tip:</strong> El motor de búsqueda de Google lee principalmente tu <code>&lt;head&gt;</code> para saber de qué trata tu página. ¡No lo descuides!
      </div>
    </div>
  );
};

export default EstructuraHTMLSlide;
