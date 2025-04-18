import { Express } from 'express';
import authRoutes from '../../modules/auth/routes/auth.routes';

export const registerRoutes = (app: Express) => {
  app.use('/api/auth', authRoutes);
};
