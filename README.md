# 🚀 Academia Web - Plataforma de Aprendizaje React

Plataforma educativa completa para aprender desarrollo web, completamente migrada a React con cursos interactivos usando **pnpm**.

## 📚 Cursos Disponibles

### ✅ Completados
- **📄 HTML5** - 7 slides con fundamentos del lenguaje de marcado
- **🎨 CSS3** - 8 slides con diseño web moderno y layouts
- **⚡ JavaScript** - 11 slides con programación interactiva y DOM
- **🐍 Python** - 10 slides con programación versátil y herramientas

## 🏗️ Arquitectura

```
Academia Web/
├── 🔧 api/                     # Funciones serverless (Vercel)
│   ├── server.js              # API Express como función serverless
│   └── package.json           # Dependencias de la API
├── ⚛️ frontend/                # Aplicación React
│   ├── src/courses/           # Cursos modulares en React
│   │   ├── HTML/              # Curso HTML5 completo
│   │   ├── CSS/               # Curso CSS3 completo
│   │   ├── JS/                # Curso JavaScript completo
│   │   └── Python/            # Curso Python completo
│   ├── src/App.js             # Componente principal
│   └── src/ProgressSystem.js  # Sistema de progreso
├── 📦 package.json            # Dependencias y scripts (pnpm)
├── 🚀 vercel.json             # Configuración de Vercel
└── 📚 README.md              # Esta documentación
```

## 🚀 Inicio Rápido

### ⚡ Script Automático (Recomendado)
```bash
./dev.sh
```

### 🖥️ Desarrollo Local
```bash
# Instalar dependencias con pnpm
pnpm install

# Iniciar solo el frontend
cd frontend && npm start
```

**Nota:** En desarrollo local, el frontend se conecta directamente a Supabase. Las funciones serverless solo funcionan en Vercel.

## 🌐 Servicios

| Servicio | Ubicación | Descripción |
|----------|-----------|-------------|
| **⚛️ Frontend** | Puerto 3005 (local) | Aplicación React completa |
| **🔧 API** | `/api/*` (Vercel) | Funciones serverless en producción |
| **💾 Supabase** | Cloud | Base de datos y autenticación |

## 🛠️ Tecnologías

- **Frontend**: React 18, CSS Modules, JavaScript ES6+
- **Backend**: Express.js como funciones serverless (Vercel)
- **Base de datos**: Supabase (PostgreSQL)
- **Autenticación**: Supabase Auth
- **Package Manager**: **pnpm** (más rápido que npm)

## 🚀 Despliegue en Vercel

Para desplegar esta aplicación en Vercel, consulta la [Guía de Despliegue](./VERCEL_DEPLOYMENT.md).

**Características del despliegue:**
- ✅ Frontend React optimizado
- ✅ API como funciones serverless
- ✅ Conexión directa con Supabase
- ✅ Variables de entorno seguras
- ✅ Soporte para React Router
- ✅ Todo en un solo repositorio

## 📞 Soporte

### Problemas Comunes
1. **Puerto ocupado** - Libera puerto 3005 (frontend)
2. **Dependencias** - Ejecuta `pnpm install` y `cd frontend && npm install`
3. **pnpm no instalado** - Instala con `npm install -g pnpm`
4. **Navegador** - Usa Chrome/Firefox para mejor experiencia
5. **API en local** - Las funciones serverless solo funcionan en Vercel

---

**🎓 ¡Aprende a tu ritmo, construye proyectos increíbles!**
