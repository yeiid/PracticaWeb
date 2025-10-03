#!/bin/bash

# Script para desarrollo completo de Academia Web usando pnpm
echo "🚀 Iniciando Academia Web - Modo Desarrollo Completo"
echo "=================================================="

# Verificar si está en el directorio correcto
if [ ! -f "package.json" ] || [ ! -d "backend" ] || [ ! -d "frontend" ]; then
    echo "❌ Error: Debes ejecutar este script desde el directorio raíz de Academia Web"
    exit 1
fi

echo "📦 Verificando dependencias..."

# Verificar si ya están instaladas las dependencias principales
if [ -d "node_modules" ] && [ -d "backend/node_modules" ] && [ -d "frontend/node_modules" ]; then
    echo "  ✅ Todas las dependencias ya están instaladas"
else
    echo "  📥 Instalando dependencias..."

    # Instalar dependencias del proyecto principal
    echo "    → Instalando dependencias principales..."
    pnpm install

    # Instalar dependencias del backend
    echo "    → Instalando dependencias del backend..."
    cd backend
    pnpm install
    cd ..

    # Instalar dependencias del frontend
    echo "    → Instalando dependencias del frontend..."
    cd frontend
    pnpm install
    cd ..

    echo "  ✅ Todas las dependencias instaladas correctamente"
fi
echo ""
echo "🏃‍♂️ Iniciando servicios..."
echo ""
echo "📊 Backend API: http://localhost:3004"
echo "⚛️  Frontend React: http://localhost:3005"
echo ""

# Ejecutar backend y frontend simultáneamente usando pnpm dlx
pnpm dlx concurrently \
  "cd backend && pnpm start" \
  "cd frontend && pnpm start" \
  --names "backend,frontend" \
  --prefix-colors "bgBlue.bold,bgGreen.bold" \
  --prefix-format "│ [{name}]" \
  --timestamp-format "HH:mm:ss" \
  --kill-others \
  --success first
