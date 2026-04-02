# 🚀 Academia Web - Guía de Inicio Rápido

¡Bienvenido a la versión optimizada de Academia Web! Este proyecto ha sido rediseñado para ofrecer una experiencia premium y una implementación robusta.

## 🛠️ Solución de Problemas (Docker)

Si al ejecutar Docker obtienes un error de permiso (`permission denied`), sigue estos pasos en tu terminal Linux:

1.  **Arreglar permisos de Docker**:
    ```bash
    sudo usermod -aG docker $USER
    ```
    *Nota: Debes cerrar sesión y volver a entrar (o reiniciar) para que los cambios surtan efecto.*

2.  **Iniciar Base de Datos manualmente**:
    ```bash
    sudo docker compose up -d db
    ```

## 🌟 Modo Demo (Sin Base de Datos)

Si no quieres o no puedes configurar Docker en este momento, la plataforma ahora detecta automáticamente si la base de datos está offline y te permite entrar en **Modo Demo**.

-   Ve a la página de [Login](http://localhost:4321/login).
    -   Si la base de datos no es detectada, aparecerá un botón naranja: **"🛠️ Entrar en Modo Demo"**.
    -   Esto te permitirá explorar el **Dashboard** y el **Curso de Git Master** al instante.

## 🧡 Curso de Git Master

El curso está totalmente integrado. Una vez dentro de la plataforma (ya sea en modo real o demo), verás la tarjeta de **Git Master** destacada. 

-   7 días de lecciones interactivas.
    -   Arquitectura basada en diapositivas React.
    -   Diseño optimizado para aprendizaje rápido.

## 🚢 Despliegue en Dockploy

El proyecto está listo para producción. Solo necesitas subir el repositorio a tu servidor con Dockploy. El archivo `docker-compose.yml` y el `docker-entrypoint.sh` se encargarán de:
1.  Esperar a que la DB esté lista.
2.  Sincronizar el esquema.
3.  Crear el usuario administrador inicial.

---
🎓 *¡Aprende a tu ritmo, construye proyectos increíbles!*
