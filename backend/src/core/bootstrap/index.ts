import { Express } from 'express';
import { initializeDatabase } from './database';
import { registerMiddlewares } from './middlewares';

export const setupApp = async (app: Express) => {
  await initializeDatabase();
  registerMiddlewares(app);
};
