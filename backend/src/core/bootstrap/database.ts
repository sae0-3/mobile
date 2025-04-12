import { testConnection } from '../common/database';

export const initializeDatabase = async () => {
  try {
    await testConnection();
    console.log('Conectado a PostgreSQL');
  } catch (err) {
    console.error('No se pudo conectar a PostgreSQL', err);
    process.exit(1);
  }
};
