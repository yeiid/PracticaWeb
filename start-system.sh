#!/bin/bash

echo "🐳 Iniciando sistema completo en Docker..."

# 1. Limpiar contenedores previos
echo "🧹 Limpiando contenedores antiguos..."
sudo docker compose down

# 2. Construir e iniciar servicios
echo "🏗️ Construyendo e iniciando servicios (db + app)..."
sudo docker compose up --build -d

echo "⏳ Esperando a que el sistema esté listo..."
# Esperar hasta que la app responda en el puerto 4321
until $(curl --output /dev/null --silent --head --fail http://localhost:4321); do
    printf '.'
    sleep 2
done

echo ""
echo "✅ ¡Sistema listo!"
echo "🌐 Academia Web: http://localhost:4321"

# 3. Sembrar datos iniciales (opcional pero recomendado)
echo "🌱 Sembrando datos iniciales en la base de datos..."
sudo docker exec academia-app node scripts/seed-user.js

echo "--------------------------------------------------------"
echo "🎉 TODO LISTO. Puedes entrar a la web ahora."
echo "Si quieres ver los logs en tiempo real, usa: 'sudo docker compose logs -f'"
echo "--------------------------------------------------------"
