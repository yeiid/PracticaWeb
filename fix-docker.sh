#!/bin/bash

echo "🚀 Iniciando reparación de permisos de Docker..."

# 1. Agregar usuario al grupo docker
if ! groups $USER | grep &>/dev/null "\bdocker\b"; then
    echo "📥 Agregando a $USER al grupo 'docker'..."
    sudo usermod -aG docker $USER
    echo "✅ Usuario agregado al grupo docker."
else
    echo "ℹ️ El usuario ya está en el grupo docker."
fi

# 2. Corregir permisos del socket
echo "🔧 Ajustando permisos de /var/run/docker.sock..."
sudo chmod 666 /var/run/docker.sock

# 3. Reiniciar servicio docker
echo "♻️ Reiniciando servicio Docker..."
sudo systemctl restart docker

echo ""
echo "--------------------------------------------------------"
echo "🎉 ¡LISTO! Ahora puedes ejecutar la base de datos real."
echo "IMPORTANTE: Para que los cambios de grupo sean permanentes,"
echo "debes cerrar sesión y volver a entrar en tu cuenta de Linux."
echo "--------------------------------------------------------"
echo ""
echo "👉 Intenta ahora: pnpm run db:up"
