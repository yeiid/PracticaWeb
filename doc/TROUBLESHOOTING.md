# 🔧 Solución de Problemas

## ❌ Error: Module not found - Python Course

### Problema
```
Module not found: Error: Can't resolve '../../courses/Python/PythonCourse' 
in '/vercel/path0/frontend/src/components/Dashboard'
```

### Causa
El archivo `.vercelignore` estaba excluyendo las carpetas `Python/`, `JavaScript/` y `JAVA/` del despliegue. Esto hacía que Vercel ignorara la carpeta `frontend/src/courses/Python/` que contiene el curso de Python.

### Solución ✅
Se corrigió el `.vercelignore` eliminando las exclusiones de carpetas de cursos:

**Antes:**
```
node_modules
.env
.env.local
*.log
.DS_Store
dev.sh
JAVA/          ❌ Esto excluía frontend/src/courses/Python
JavaScript/    ❌ Esto excluía frontend/src/courses/JS
Python/        ❌ Esto excluía frontend/src/courses/Python
pnpm-lock.yaml
```

**Después:**
```
node_modules
.env
.env.local
*.log
.DS_Store
dev.sh
pnpm-lock.yaml
```

### Pasos para Re-desplegar

1. **Commit los cambios:**
   ```bash
   git add .vercelignore .gitignore
   git commit -m "fix: corregir .vercelignore para incluir cursos"
   git push
   ```

2. **Vercel re-desplegará automáticamente** si tienes integración con Git

3. **O re-despliega manualmente:**
   ```bash
   vercel --prod
   ```

### Verificación

Después del despliegue, verifica:
- ✅ Frontend carga correctamente
- ✅ Todos los cursos están disponibles (HTML, CSS, JS, Python)
- ✅ No hay errores 404 en los cursos

## 📝 Otros Problemas Comunes

### Build falla con errores de dependencias

**Solución:**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Variables de entorno no funcionan

**Solución:**
1. Verifica que estén configuradas en Vercel Dashboard
2. Asegúrate de seleccionar los 3 entornos (Production, Preview, Development)
3. Re-despliega después de agregar variables nuevas

### API no responde (500/502)

**Solución:**
1. Verifica que las 4 variables de entorno estén configuradas
2. Revisa logs en Vercel Dashboard → Functions
3. Asegúrate de que `api/package.json` tenga todas las dependencias

### Rutas no funcionan (404)

**Solución:**
- Verifica que los rewrites estén en `vercel.json`
- React Router necesita que todas las rutas redirijan a `index.html`

## 🆘 Soporte

Si el problema persiste:
1. Revisa los logs en Vercel Dashboard
2. Verifica que todos los archivos estén en Git
3. Asegúrate de que `.vercelignore` no excluya archivos necesarios
