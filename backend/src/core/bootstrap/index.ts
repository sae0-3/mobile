import { Express } from 'express';
import passport from 'passport';
import { initializeDatabase } from './database';
import { errorHandler } from './error-handler';
import { registerMiddlewares } from './middlewares';
import { configurePassport } from './passport';
import { registerRoutes } from './routes';

export const setupApp = async (app: Express) => {
  await initializeDatabase();
  configurePassport(passport);
  app.use(passport.initialize());
  registerMiddlewares(app);
  registerRoutes(app);
  app.use(errorHandler);
};
