import { Express } from 'express';
import authRoutes from '../../modules/auth/routes/auth.routes';
import catalogRoutes from '../../modules/catalog/catalog.routes';

export const registerRoutes = (app: Express) => {
  app.use('/api/auth', authRoutes);
  app.use('/api/catalog', catalogRoutes);
};
