import { checkConnection } from '../src/lib/db.js';

async function main() {
  console.log('🔍 Comprobando conexión a la base de datos...');
  const isConnected = await checkConnection();
  
  if (isConnected) {
    console.log('✅ Base de datos lista para usar.');
    process.exit(0);
  } else {
    console.warn('⚠️ La base de datos no está disponible.');
    console.log('\nSi estás en Linux, recuerda configurar los permisos de Docker:');
    console.log('sudo usermod -aG docker $USER');
    console.log('\nO inicia la DB manualmente:');
    console.log('sudo docker compose up -d db\n');
    process.exit(1);
  }
}

main();
