import React from 'react';
import styles from './BackendSlides.module.css';

export const IntroduccionBackendSlide = () => {
  return (
    <div className={styles.slide}>
      <h1 className={styles.title}>Introducción al Desarrollo Backend</h1>
      
      <div className={styles.content}>
        <p>El backend es la parte del desarrollo web que se ejecuta en el servidor y maneja la lógica, bases de datos, autenticación y más.</p>
        
        <div className={styles.note}>
          <div className={styles.noteTitle}>¿Qué aprenderás en este curso?</div>
          <ul>
            <li>Fundamentos de Node.js</li>
            <li>Creación de APIs RESTful con Express</li>
            <li>Gestión de bases de datos</li>
            <li>Autenticación y seguridad</li>
            <li>Despliegue de aplicaciones backend</li>
          </ul>
        </div>

        <div className={styles.exampleContainer}>
          <div className={styles.exampleTitle}>Arquitectura Cliente-Servidor</div>
          <div className={styles.codeBlock}>
{`Cliente (Frontend)  <----->  Servidor (Backend) <-----> Base de Datos
   (Navegador)        HTTP         (Node.js)             (MongoDB/PostgreSQL)
   Interfaz de Usuario           Lógica de Negocio     Almacenamiento
   React/Vue/Angular             Autenticación         Persistencia de Datos`}
          </div>
        </div>

        <h3 className={styles.subtitle}>Herramientas que usaremos</h3>
        <ul>
          <li><strong>Node.js</strong>: Entorno de ejecución de JavaScript</li>
          <li><strong>Express</strong>: Framework para construir APIs</li>
          <li><strong>MongoDB/PostgreSQL</strong>: Bases de datos</li>
          <li><strong>Postman</strong>: Para probar nuestras APIs</li>
          <li><strong>Git</strong>: Control de versiones</li>
        </ul>
      </div>
    </div>
  );
};
