# 🚀 Guía Rápida de Despliegue en Vercel

## ✅ Configuración Actual

Tu proyecto está **100% listo** para desplegarse en Vercel con:
- ✅ Frontend React en `/frontend`
- ✅ API Serverless en `/api`
- ✅ Supabase como base de datos
- ✅ Todo en un solo repositorio

## 📋 Pasos para Desplegar (5 minutos)

### 1. Conecta tu Repositorio a Vercel

Opción A - **Desde la Web** (Recomendado):
1. Ve a [vercel.com](https://vercel.com)
2. Click en "Add New Project"
3. Importa tu repositorio de GitHub
4. Vercel detectará automáticamente la configuración

Opción B - **Desde CLI**:
```bash
npm i -g vercel
vercel
```

### 2. Configura Variables de Entorno

En Vercel Dashboard → Settings → Environment Variables, agrega:

**Frontend (Públicas):**
```
REACT_APP_SUPABASE_URL=https://njkygzwlhlijwpfyyykp.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qa3lnendsaGxpandwZnl5eWtwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk1NzYyOTUsImV4cCI6MjA3NTE1MjI5NX0.j2qS71QwogFfB4PcvK_480gxFp22B-iQj21rz2LHy1c
```

**API Serverless (Privadas):**
```
SUPABASE_URL=https://njkygzwlhlijwpfyyykp.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qa3lnendsaGxpandwZnl5eWtwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTU3NjI5NSwiZXhwIjoyMDc1MTUyMjk1fQ.vxlJnvOKeaP_XUAD5rn0QBI7UXPZQvpaaocZnXO06Eg
```

**Importante:** Selecciona los 3 entornos (Production, Preview, Development)

### 3. Despliega

Vercel desplegará automáticamente. Si usas CLI:
```bash
vercel --prod
```

### 4. Verifica

- **Frontend**: `https://tu-proyecto.vercel.app`
- **API Health**: `https://tu-proyecto.vercel.app/api/health`

## 📁 Estructura del Proyecto

```
PracticaWeb/
├── api/
│   ├── server.js          # API Express (funciones serverless)
│   └── package.json       # Dependencias: express, supabase, cors
├── frontend/
│   ├── src/               # Código React
│   ├── public/            # Archivos estáticos
│   └── package.json       # Dependencias React
├── vercel.json           # Configuración de Vercel
└── .env.example          # Template de variables de entorno
```

## 🔗 Rutas de la API

Todas disponibles en `/api/*`:

- `GET /api/health` - Health check
- `GET /api/progress` - Obtener progreso del usuario
- `POST /api/progress` - Actualizar progreso
- `GET /api/certificates` - Obtener certificados
- `POST /api/certificates` - Generar certificado
- `GET /api/profile` - Obtener perfil
- `PUT /api/profile` - Actualizar perfil
- `PUT /api/auth/user` - Actualizar credenciales

## 🛠️ Desarrollo Local

```bash
# Solo necesitas el frontend
cd frontend && npm start
```

**Nota:** Las funciones serverless solo funcionan en Vercel. En local, el frontend se conecta directamente a Supabase.

## ❓ Problemas Comunes

### Build falla
- Verifica que todas las dependencias estén en `frontend/package.json`
- Revisa los logs en Vercel Dashboard

### API no responde
- Verifica que las 4 variables de entorno estén configuradas
- Revisa logs en Vercel Dashboard → Functions

### Variables de entorno no funcionan
- Asegúrate de seleccionar los 3 entornos al configurarlas
- Re-despliega después de agregar variables nuevas

## 📚 Documentación Completa

- [Guía Detallada de Despliegue](./VERCEL_DEPLOYMENT.md)
- [Resumen de Configuración](./DEPLOYMENT_SUMMARY.md)
- [README Principal](./README.md)

---

**¡Listo para desplegar! 🎉**
