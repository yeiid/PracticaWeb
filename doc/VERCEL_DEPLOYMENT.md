# Guía de Despliegue en Vercel

## Configuración Implementada

Este proyecto está configurado para desplegarse en Vercel con:
- **Frontend**: React app (construida con `react-scripts`)
- **Backend**: Funciones serverless en `/api` (Express.js)
- **Base de datos**: Supabase (conexión directa)

## Estructura de Archivos

```
PracticaWeb/
├── api/                   # Funciones serverless
│   ├── server.js         # API Express adaptada para serverless
│   └── package.json      # Dependencias de la API
├── frontend/              # Aplicación React
│   ├── src/
│   │   ├── config/       # Configuración de Supabase
│   │   ├── courses/      # Cursos (HTML, CSS, JS, Python)
│   │   └── ...
│   ├── public/
│   └── package.json
├── vercel.json           # Configuración de Vercel
└── .vercelignore         # Archivos a ignorar en el despliegue
```

## Pasos para Desplegar

### 1. Instalar Vercel CLI (opcional)

```bash
npm i -g vercel
```

### 2. Configurar Variables de Entorno en Vercel

Debes agregar las siguientes variables de entorno en el dashboard de Vercel:

**Para el Frontend:**
- `REACT_APP_SUPABASE_URL`: Tu URL de Supabase
- `REACT_APP_SUPABASE_ANON_KEY`: Tu clave anónima (pública) de Supabase

**Para las Funciones Serverless (API):**
- `SUPABASE_URL`: Tu URL de Supabase
- `SUPABASE_SERVICE_ROLE_KEY`: Tu clave de servicio de Supabase (privada)

**Cómo agregar variables de entorno:**
1. Ve a tu proyecto en Vercel Dashboard
2. Settings → Environment Variables
3. Agrega cada variable con su valor
4. Selecciona los entornos: Production, Preview, Development

**Nota:** El frontend usa la clave anónima (pública) y las funciones serverless usan la service role key (privada) para operaciones administrativas.

### 3. Desplegar desde la CLI

```bash
# Desde la raíz del proyecto
vercel

# Para producción
vercel --prod
```

### 4. Desplegar desde GitHub

1. Conecta tu repositorio en [vercel.com](https://vercel.com)
2. Vercel detectará automáticamente la configuración
3. Agrega las variables de entorno en Settings
4. El despliegue se hará automáticamente con cada push

## Configuración de vercel.json

```json
{
  "buildCommand": "cd frontend && npm install && npm run build",
  "outputDirectory": "frontend/build",
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "/api/server"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

Esta configuración:
- **buildCommand**: Instala dependencias y construye el frontend React
- **outputDirectory**: Define dónde están los archivos estáticos compilados
- **rewrites**: 
  - Redirige todas las peticiones `/api/*` a la función serverless
  - Redirige el resto de rutas al `index.html` para React Router

## Desarrollo Local

Para desarrollo local:

```bash
# Solo el frontend (recomendado)
cd frontend && npm start
```

**Nota:** Las funciones serverless (`/api`) solo funcionan en Vercel. En desarrollo local, el frontend se conecta directamente a Supabase sin necesidad del backend intermedio.

## Notas Importantes

1. **Todo en Uno**: Frontend y API en el mismo repositorio
2. **Funciones Serverless**: El backend Express se ejecuta como funciones serverless en Vercel
3. **Supabase**: Maneja toda la autenticación, base de datos y almacenamiento
4. **Variables de Entorno**: NUNCA subas archivos `.env` al repositorio
5. **Cold Starts**: Las primeras peticiones a la API pueden ser lentas (arranque en frío)
6. **Timeouts**: Las funciones serverless tienen límite de 10s en plan gratuito

## Verificación del Despliegue

Después del despliegue, verifica:

1. **Frontend**: Accede a tu URL de Vercel (ej: `https://tu-proyecto.vercel.app`)
2. **API Health**: `https://tu-proyecto.vercel.app/api/health`
3. **Autenticación**: Prueba el login/registro con Supabase
4. **Navegación**: Verifica que todas las rutas funcionen correctamente
5. **Cursos**: Accede a los cursos (HTML, CSS, JS, Python)
6. **Funcionalidad**: Verifica progreso, certificados, etc.

## Troubleshooting

### Error: "Environment variable not defined"
- Frontend: Configura `REACT_APP_SUPABASE_URL` y `REACT_APP_SUPABASE_ANON_KEY`
- API: Configura `SUPABASE_URL` y `SUPABASE_SERVICE_ROLE_KEY`

### Frontend no carga
- Verifica que `outputDirectory` apunte a `frontend/build`
- Asegúrate de que el build command sea correcto
- Revisa los logs en Vercel Dashboard → Deployments → [tu deployment]

### Rutas no funcionan (404)
- Verifica que los rewrites estén configurados correctamente en `vercel.json`
- React Router necesita que todas las rutas redirijan a `index.html`

### API no responde (500/502)
- Verifica que las variables de entorno de la API estén configuradas
- Revisa los logs de las funciones en Vercel Dashboard → Functions
- Asegúrate de que `api/package.json` tenga todas las dependencias

### Error de conexión con Supabase
- Frontend usa `REACT_APP_SUPABASE_ANON_KEY` (clave pública)
- API usa `SUPABASE_SERVICE_ROLE_KEY` (clave privada)
- Verifica que ambas estén correctamente configuradas
