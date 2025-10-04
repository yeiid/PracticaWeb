# 📦 Gestores de Paquetes en Vercel

## ¿Cómo Vercel Detecta el Gestor de Paquetes?

Vercel detecta automáticamente el gestor de paquetes basándose en los **archivos lock** presentes en tu proyecto:

### Detección Automática

| Archivo Lock | Gestor Detectado |
|--------------|------------------|
| `pnpm-lock.yaml` | **pnpm** |
| `yarn.lock` | **yarn** |
| `package-lock.json` | **npm** |
| `bun.lockb` | **bun** |

**Prioridad de detección:**
1. `pnpm-lock.yaml` (más alta)
2. `yarn.lock`
3. `package-lock.json`
4. `bun.lockb` (más baja)

## 🔧 Configuración Actual del Proyecto

### Archivos Lock Presentes

```
PracticaWeb/
├── pnpm-lock.yaml          ✅ (raíz)
├── frontend/
│   ├── package-lock.json   ✅ (npm)
│   └── pnpm-lock.yaml      ✅ (pnpm)
└── api/
    └── package.json        ✅ (sin lock)
```

### ¿Qué Gestor Usa Vercel?

**Vercel usa `npm`** porque:
1. El `buildCommand` en `vercel.json` especifica `npm install`
2. El `installCommand` está configurado como `npm install`

### Configuración en `vercel.json`

```json
{
  "buildCommand": "cd frontend && npm install && npm run build",
  "installCommand": "npm install",
  "outputDirectory": "frontend/build"
}
```

## 🎯 Recomendaciones

### Opción 1: Usar npm (Actual - Recomendado para Vercel)

**Ventajas:**
- ✅ Más compatible con Vercel
- ✅ Menos problemas de build
- ✅ Funciona out-of-the-box

**Configuración:**
```json
{
  "buildCommand": "cd frontend && npm install && npm run build",
  "installCommand": "npm install"
}
```

### Opción 2: Usar pnpm

**Ventajas:**
- ✅ Más rápido
- ✅ Ahorra espacio en disco
- ✅ Mejor manejo de dependencias

**Configuración:**
```json
{
  "buildCommand": "cd frontend && pnpm install && pnpm run build",
  "installCommand": "pnpm install"
}
```

**Nota:** Vercel soporta pnpm nativamente desde 2021.

### Opción 3: Especificar en package.json

Puedes agregar un campo `packageManager` en tu `package.json`:

```json
{
  "name": "academia-web",
  "packageManager": "npm@10.0.0"
}
```

O para pnpm:

```json
{
  "name": "academia-web",
  "packageManager": "pnpm@8.0.0"
}
```

## 🚀 Configuración Actual (npm)

El proyecto está configurado para usar **npm** en Vercel, que es la opción más estable y recomendada.

### Para Desarrollo Local

Puedes seguir usando `pnpm` localmente:
```bash
pnpm install
pnpm run dev
```

### Para Vercel (Producción)

Vercel usará `npm` según la configuración en `vercel.json`:
```bash
npm install
npm run build
```

## 📝 Notas Importantes

1. **Archivos Lock:** Vercel puede detectar múltiples archivos lock, pero usa el especificado en `buildCommand`
2. **Consistencia:** Es mejor usar el mismo gestor en local y producción
3. **Cache:** Vercel cachea las dependencias basándose en el archivo lock
4. **API Functions:** Las funciones serverless en `/api` usan npm automáticamente

## 🔄 Cambiar de npm a pnpm (Opcional)

Si quieres usar pnpm en Vercel:

1. **Actualiza `vercel.json`:**
```json
{
  "buildCommand": "cd frontend && pnpm install && pnpm run build",
  "installCommand": "pnpm install"
}
```

2. **Asegúrate de tener `pnpm-lock.yaml`:**
```bash
cd frontend
pnpm install
```

3. **Commit y push:**
```bash
git add vercel.json frontend/pnpm-lock.yaml
git commit -m "chore: cambiar a pnpm en Vercel"
git push
```

## ✅ Conclusión

**Configuración actual:** npm (recomendado para Vercel)
- ✅ Más estable
- ✅ Menos problemas de compatibilidad
- ✅ Funciona perfectamente con funciones serverless
