import { Express } from 'express';
import authRoutes from '../../modules/auth/auth.routes';
import catalogRoutes from '../../modules/catalog/catalog.routes';
import usersRoutes from '../../modules/users/users.routes';

export const registerRoutes = (app: Express) => {
  app.use('/api/auth', authRoutes);
  app.use('/api/catalog', catalogRoutes);
  app.use('/api/users', usersRoutes);
};
