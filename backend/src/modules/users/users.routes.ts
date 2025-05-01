import { Router } from 'express';
import { authenticateJwt, requireRole } from '../../core/common/middlewares';
import { createUsersController } from './users.bootstrap';

const router = Router();
const clientRouter = Router();
const dealerRouter = Router();
const adminRouter = Router();
const {
  clientController,
  dealerController,
  adminController
} = createUsersController();

clientRouter.post('/', clientController.insert);
clientRouter.use(authenticateJwt);
clientRouter.get('/', clientController.getAll)
clientRouter.get('/:id', clientController.getById);
clientRouter.put('/:id', clientController.updateById);
clientRouter.delete('/:id', clientController.deleteById);

dealerRouter.use(authenticateJwt);
dealerRouter.get('/', dealerController.getAll);
dealerRouter.post('/', requireRole(['admin'],), dealerController.insert);
dealerRouter.get('/:id', dealerController.getById);
dealerRouter.put('/:id', requireRole(['admin', 'dealer']), dealerController.updateById);
dealerRouter.delete('/:id', requireRole(['admin', 'dealer']), dealerController.deleteById);

adminRouter.use(authenticateJwt, requireRole(['admin']));
adminRouter.post('/', adminController.insert);
adminRouter.delete('/:id', adminController.deleteById);

router.use('/clients', clientRouter);
router.use('/dealers', dealerRouter);
router.use('/admins', adminRouter);

export default router;
