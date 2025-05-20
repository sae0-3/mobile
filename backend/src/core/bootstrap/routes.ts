import { Express } from 'express';
import authRoutes from '../../modules/auth/routes/auth.routes';
import catalogRoutes from '../../modules/catalog/catalog.routes';
import locationsRoutes from '../../modules/locations/locations.routes';
import usersRoutes from '../../modules/users/users.routes';
import ordersRoutes from '../../modules/orders/orders.routes';

export const registerRoutes = (app: Express) => {
  app.use('/api/auth', authRoutes);
  app.use('/api/catalog', catalogRoutes);
  app.use('/api/users', usersRoutes);
  app.use('/api/orders', ordersRoutes);
  app.use('/api/locations', locationsRoutes);
};
