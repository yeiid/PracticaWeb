#!/bin/sh
# entrypoint.sh para Academia Web

# Esperar a que la base de datos esté lista
echo "⏳ Esperando a la base de datos..."
until nc -z db 5432; do
  sleep 1
done
echo "✅ Base de datos detectada"

# Ejecutar migraciones de esquema
echo "🔧 Ejecutando migraciones de base de datos..."
node scripts/migrate-db.js || echo "⚠️  Migraciones completadas con advertencias"

# Ejecutar el script de seeding para asegurar que el sistema tenga datos básicos
echo "🚀 Sincronizando datos básicos..."
node scripts/seed-user.js || echo "⚠️  Seed completado con advertencias"

# Iniciar la aplicación
echo "🌟 Iniciando Academia Web..."
exec node ./dist/server/entry.mjs
