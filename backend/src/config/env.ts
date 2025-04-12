import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const config = {
  PORT: process.env.PORT || 3000,
  DB_URI: process.env.DB_URI || 'postgres://postgres:1234@localhost:5432/mobile',
} as const;
