import React, { useState } from 'react';
import styles from './BackendSlides.module.css';

export const DespliegueBackendSlide = () => {
  const [showDockerExample, setShowDockerExample] = useState(false);
  const [showPm2Example, setShowPm2Example] = useState(false);

  return (
    <div className={styles.slide}>
      <h1 className={styles.title}>Despliegue de Aplicaciones Backend</h1>
      
      <div className={styles.content}>
        <p>Desplegar una aplicación backend implica preparar tu código para producción y elegir la infraestructura adecuada.</p>
        
        <h3 className={styles.subtitle}>Opciones de Despliegue</h3>
        
        <div className={styles.exampleContainer}>
          <div className={styles.exampleTitle}>1. Plataformas como Servicio (PaaS)</div>
          <ul>
            <li><strong>Heroku</strong>: Fácil de usar, ideal para principiantes</li>
            <li><strong>Render</strong>: Alternativa moderna a Heroku</li>
            <li><strong>Vercel</strong>: Excelente para proyectos con Next.js</li>
            <li><strong>Railway</strong>: Con generoso plan gratuito</li>
          </ul>
        </div>

        <div className={styles.exampleContainer}>
          <div className={styles.exampleTitle}>2. Infraestructura como Servicio (IaaS)</div>
          <ul>
            <li><strong>AWS EC2</strong>: Máquinas virtuales en la nube</li>
            <li><strong>Google Cloud Run</strong>: Contenedores sin servidor</li>
            <li><strong>DigitalOcean Droplets</strong>: Servidores en la nube</li>
            <li><strong>Linode</strong>: Alternativa económica a AWS/GCP</li>
          </ul>
        </div>

        <h3 className={styles.subtitle}>Docker para Despliegue</h3>
        
        <button 
          onClick={() => setShowDockerExample(!showDockerExample)}
          className={styles.navButton}
          style={{ marginBottom: '1rem' }}
        >
          {showDockerExample ? 'Ocultar ejemplo de Docker' : 'Mostrar ejemplo de Docker'}
        </button>
        
        {showDockerExample && (
          <div className={styles.codeBlock}>
{`# Dockerfile
# Usar una imagen de Node.js
FROM node:16-alpine

# Crear directorio de la aplicación
WORKDIR /usr/src/app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install --only=production

# Copiar el código de la aplicación
COPY . .

# Puerto en el que se ejecutará la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación
CMD [ "node", "server.js" ]

# .dockerignore
node_modules
npm-debug.log
.env
.git
.gitignore`}
          </div>
        )}

        <h3 className={styles.subtitle}>PM2 para Gestión de Procesos</h3>
        
        <button 
          onClick={() => setShowPm2Example(!showPm2Example)}
          className={styles.navButton}
          style={{ marginBottom: '1rem' }}
        >
          {showPm2Example ? 'Ocultar ejemplo de PM2' : 'Mostrar ejemplo de PM2'}
        </button>
        
        {showPm2Example && (
          <div className={styles.codeBlock}>
{`# Iniciar la aplicación con PM2
pm2 start server.js --name "mi-aplicacion"

# Comandos útiles de PM2
pm2 list       # Listar aplicaciones
pm2 monit      # Monitorear aplicaciones
pm2 logs       # Ver logs
pm2 reload app # Recargar sin tiempo de inactividad
pm2 save       # Guardar configuración`}
          </div>
        )}

        <h3 className={styles.subtitle}>Variables de Entorno en Producción</h3>
        
        <div className={styles.codeBlock}>
{`# .env (nunca subir a repositorio)
NODE_ENV=production
PORT=3000
JWT_SECRET=tu_clave_secreta_muy_larga
DATABASE_URL=postgres://usuario:contraseña@localhost:5432/mi_base_de_datos`}
        </div>

        <div className={styles.note}>
          <div className={styles.noteTitle}>Buenas Prácticas para Producción</div>
          <ul>
            <li>Usar variables de entorno para configuración sensible</li>
            <li>Implementar manejo de errores adecuado</li>
            <li>Configurar logs para monitoreo</li>
            <li>Establecer un proceso de CI/CD</li>
            <li>Configurar copias de seguridad automáticas</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
