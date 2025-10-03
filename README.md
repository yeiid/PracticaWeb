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
├── 🔧 backend/                 # API REST (puerto 3004)
├── ⚛️ frontend/                # Aplicación React (puerto 3005)
│   ├── src/courses/           # Cursos modulares en React
│   │   ├── HTML/              # Curso HTML5 completo
│   │   ├── CSS/               # Curso CSS3 completo
│   │   ├── JS/                # Curso JavaScript completo
│   │   └── Python/            # Curso Python completo
│   ├── src/App.js             # Componente principal
│   └── src/ProgressSystem.js  # Sistema de progreso
├── 📦 package.json            # Dependencias y scripts (pnpm)
├── ⚡ dev.sh                   # Script de desarrollo completo
└── 📚 README.md              # Esta documentación
```

## 🚀 Inicio Rápido

### ⚡ Script Automático (Recomendado)
```bash
./dev.sh
```

### 🖥️ Manualmente
```bash
# Instalar dependencias con pnpm
pnpm install

# Iniciar backend y frontend
pnpm run dev
```

## 🌐 Servicios

| Servicio | Puerto | Descripción |
|----------|--------|-------------|
| **🔧 Backend** | 3004 | API REST para progreso |
| **⚛️ Frontend** | 3005 | Aplicación React completa |

## 🛠️ Tecnologías

- **Frontend**: React 18, CSS Modules, JavaScript ES6+
- **Backend**: Node.js, Express.js, JSON
- **Package Manager**: **pnpm** (más rápido que npm)
- **Automatización**: concurrently, scripts bash

## 📞 Soporte

### Problemas Comunes
1. **Puertos ocupados** - Libera puertos 3004 y 3005
2. **Dependencias** - Ejecuta `pnpm install`
3. **pnpm no instalado** - Instala con `npm install -g pnpm`
4. **Navegador** - Usa Chrome/Firefox para mejor experiencia

---

**🎓 ¡Aprende a tu ritmo, construye proyectos increíbles!**
