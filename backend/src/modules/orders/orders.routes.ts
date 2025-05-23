import { Router } from 'express';
import { authenticateJwt, requireRole } from '../../core/common/middlewares';
import { createOrderController } from './orders.bootstrap';

const router = Router();
const dealerOrderRouter = Router();
const clientOrderRouter = Router();
const {
  dealerOrderController,
  clientOrderController,
} = createOrderController();

router.use(authenticateJwt);

dealerOrderRouter.get('/', dealerOrderController.getAllAvailableOrders);
dealerOrderRouter.get('/history', requireRole(['dealer']), dealerOrderController.getHistory);
dealerOrderRouter.get('/history/:orderId', requireRole(['dealer']), dealerOrderController.getOrderFromHistoryById);
dealerOrderRouter.patch('/:orderId/accept', requireRole(['dealer']), dealerOrderController.accepOrder);
dealerOrderRouter.get('/:orderId/location', dealerOrderController.getOrderLocationInfo);
dealerOrderRouter.get('/:orderId', dealerOrderController.getOrderDetails);
dealerOrderRouter.patch('/:orderId', requireRole(['dealer']), dealerOrderController.markOrderAsDelivered);

clientOrderRouter.use(requireRole(['client']));
clientOrderRouter.get('/', clientOrderController.getAll);
clientOrderRouter.post('/', clientOrderController.create);
clientOrderRouter.get('/:orderId', clientOrderController.getById);
clientOrderRouter.patch('/:orderId', clientOrderController.cancelById);

router.use('/delivery', dealerOrderRouter);
router.use('/client', clientOrderRouter);

export default router;
