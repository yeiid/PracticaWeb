# Guía de Despliegue en Vercel

## Configuración Implementada

Este proyecto está configurado para desplegarse en Vercel con:
- **Frontend**: React app (construida con `react-scripts`)
- **Backend**: Express API como funciones serverless

## Estructura de Archivos

```
PracticaWeb/
├── api/                    # Funciones serverless para Vercel
│   ├── server.js          # API Express adaptada para serverless
│   └── package.json       # Dependencias de la API
├── frontend/              # Aplicación React
│   ├── src/
│   ├── public/
│   └── package.json
├── backend/               # Backend original (solo para desarrollo local)
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

- `SUPABASE_URL`: Tu URL de Supabase
- `SUPABASE_SERVICE_ROLE_KEY`: Tu clave de servicio de Supabase

**Cómo agregar variables de entorno:**
1. Ve a tu proyecto en Vercel Dashboard
2. Settings → Environment Variables
3. Agrega cada variable con su valor
4. Selecciona los entornos: Production, Preview, Development

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
  "version": 2,
  "buildCommand": "cd frontend && npm install && npm run build",
  "outputDirectory": "frontend/build",
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "/api/server"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/server"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

## Rutas de la API

Todas las rutas de la API están disponibles en `/api/*`:

- `GET /api/health` - Health check
- `GET /api/progress` - Obtener progreso del usuario
- `POST /api/progress` - Actualizar progreso
- `GET /api/certificates` - Obtener certificados
- `POST /api/certificates` - Generar certificado
- `GET /api/profile` - Obtener perfil
- `PUT /api/profile` - Actualizar perfil
- `PUT /api/auth/user` - Actualizar credenciales

## Desarrollo Local

Para desarrollo local, sigue usando:

```bash
# Desde la raíz
pnpm run dev

# O manualmente
cd backend && npm start
cd frontend && npm start
```

## Notas Importantes

1. **Serverless Functions**: El backend se ejecuta como funciones serverless en Vercel, no como un servidor Express tradicional
2. **Cold Starts**: Las primeras peticiones pueden ser más lentas debido al arranque en frío
3. **Timeouts**: Las funciones serverless tienen un límite de tiempo de ejecución (10s en plan gratuito)
4. **Variables de Entorno**: NUNCA subas archivos `.env` al repositorio

## Verificación del Despliegue

Después del despliegue, verifica:

1. **Frontend**: Accede a tu URL de Vercel
2. **API Health**: `https://tu-dominio.vercel.app/api/health`
3. **Autenticación**: Prueba el login/registro
4. **Funcionalidad**: Verifica que todas las features funcionen

## Troubleshooting

### Error: "Module not found"
- Verifica que todas las dependencias estén en `api/package.json`

### Error: "Environment variable not defined"
- Asegúrate de haber configurado las variables en Vercel Dashboard

### Error 500 en las APIs
- Revisa los logs en Vercel Dashboard → Deployments → [tu deployment] → Functions

### Frontend no carga
- Verifica que `outputDirectory` apunte a `frontend/build`
- Asegúrate de que el build command sea correcto
