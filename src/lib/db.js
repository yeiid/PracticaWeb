import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL || 'postgres://postgres:password@localhost:5432/postgres';

let sql;
try {
  sql = postgres(connectionString, {
    max: 10,
    idle_timeout: 20,
    connect_timeout: 5, // Reducido para fallar más rápido en local si no hay DB
  });
} catch (error) {
  console.error('❌ Error de inicialización de Postgres:', error.message);
}

export default sql;

// Helper to check connection status
export async function checkConnection() {
  if (!sql) return false;
  
  try {
    const result = await sql`SELECT 1+1 AS result`;
    const isOk = result && result[0] && result[0].result === 2;
    if (isOk) console.log('✅ Base de Datos Conectada');
    return isOk;
  } catch (error) {
    if (error.code === 'ECONNREFUSED' || error.message.includes('permission denied')) {
      console.warn('⚠️ Base de Datos Offline o Permiso Denegado. Corriendo en modo limitado.');
    } else {
      console.error('❌ Error de Base de Datos:', error.message);
    }
    return false;
  }
}
