# 🔧 Configuración de Supabase

## Error: "Failed to fetch"

Este error ocurre porque las tablas `progress` y `certificates` no existen en tu base de datos de Supabase.

## ✅ Solución Rápida

### 1. Ve al SQL Editor de Supabase

1. Abre tu proyecto en [supabase.com](https://supabase.com)
2. Ve a **SQL Editor** en el menú lateral
3. Click en **New Query**

### 2. Ejecuta el Schema

Copia y pega el contenido completo de `supabase-schema.sql` y ejecuta:

```sql
-- Esto creará:
-- ✅ Tabla progress (progreso de usuarios)
-- ✅ Tabla certificates (certificados)
-- ✅ Políticas de seguridad (RLS)
-- ✅ Índices para rendimiento
-- ✅ Triggers automáticos
```

### 3. Verifica las Tablas

Después de ejecutar el SQL:

1. Ve a **Table Editor** en Supabase
2. Deberías ver:
   - ✅ `progress`
   - ✅ `certificates`

## 🔐 Row Level Security (RLS)

Las políticas de seguridad ya están configuradas:

- ✅ Los usuarios solo pueden ver su propio progreso
- ✅ Los usuarios solo pueden ver sus propios certificados
- ✅ No se puede acceder a datos de otros usuarios

## 🧪 Probar la Configuración

### Opción 1: Desde la App

1. Haz commit y push de los cambios
2. Espera el re-despliegue de Vercel
3. Accede a tu app
4. El error "Failed to fetch" debería desaparecer

### Opción 2: Desde Supabase

En el SQL Editor, ejecuta:

```sql
-- Ver todas las tablas
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';

-- Ver políticas de RLS
SELECT * FROM pg_policies 
WHERE tablename IN ('progress', 'certificates');
```

## 📊 Estructura de Datos

### Tabla `progress`

```json
{
  "id": "uuid",
  "user_id": "uuid (referencia a auth.users)",
  "progress_data": {
    "html": { "completed": 5, "total": 7 },
    "css": { "completed": 3, "total": 8 },
    "js": { "completed": 0, "total": 11 },
    "python": { "completed": 0, "total": 10 }
  },
  "created_at": "timestamp",
  "updated_at": "timestamp"
}
```

### Tabla `certificates`

```json
{
  "id": "uuid",
  "user_id": "uuid (referencia a auth.users)",
  "course_id": "html | css | js | python",
  "student_name": "Nombre del estudiante",
  "created_at": "timestamp"
}
```

## 🚨 Si el Error Persiste

### 1. Verifica las Variables de Entorno

En Vercel Dashboard → Settings → Environment Variables:

```
REACT_APP_SUPABASE_URL=https://njkygzwlhlijwpfyyykp.supabase.co
REACT_APP_SUPABASE_ANON_KEY=tu_anon_key
SUPABASE_URL=https://njkygzwlhlijwpfyyykp.supabase.co
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key
```

### 2. Verifica RLS

Si las políticas de RLS están muy restrictivas:

```sql
-- Temporalmente deshabilitar RLS para probar (NO RECOMENDADO EN PRODUCCIÓN)
ALTER TABLE progress DISABLE ROW LEVEL SECURITY;
ALTER TABLE certificates DISABLE ROW LEVEL SECURITY;
```

### 3. Revisa los Logs

- **Navegador:** F12 → Console
- **Vercel:** Dashboard → Functions → Logs
- **Supabase:** Dashboard → Logs

## ✅ Checklist

- [ ] Ejecutar `supabase-schema.sql` en SQL Editor
- [ ] Verificar que las tablas existen en Table Editor
- [ ] Verificar que RLS está habilitado
- [ ] Hacer commit y push de los cambios del código
- [ ] Esperar re-despliegue en Vercel
- [ ] Probar la app

## 🎉 Resultado Esperado

Después de configurar Supabase:

- ✅ No más error "Failed to fetch"
- ✅ El progreso se guarda en la base de datos
- ✅ Los certificados se pueden generar
- ✅ Todo funciona tanto en local como en Vercel
