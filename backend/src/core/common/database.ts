import { Pool } from 'pg';
import { config } from '../../config/env';

export const pool = new Pool({
  connectionString: config.DB_URI,
  ssl: false,
});

export async function testConnection() {
  let client;

  try {
    client = await pool.connect();
    console.log('✅ Conexión exitosa a PostgreSQL');

    const result = await client.query('SELECT NOW() as current_time');
    console.log('Hora actual en la DB:', result.rows[0].current_time);
  } catch (err) {
    console.error('Error al conectar a PostgreSQL:', err);
    throw err;
  } finally {
    if (client) client.release();
  }
}

pool.on('error', (err) => {
  console.error('Error en el pool de conexiones', err);
});
