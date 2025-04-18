import { Express } from 'express';
import { initializeDatabase } from './database';
import { errorHandler } from './error-handler';
import { registerMiddlewares } from './middlewares';
import { registerRoutes } from './routes';

export const setupApp = async (app: Express) => {
  await initializeDatabase();
  registerMiddlewares(app);
  registerRoutes(app);
  app.use(errorHandler);
};
