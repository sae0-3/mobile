import { Router } from 'express';
import { authenticateJwt, requireRole } from '../../core/common/middlewares';
import { createOrderController } from './orders.bootstrap';

const router = Router();
const dealerOrderRouter = Router();
const {
  dealerOrderController,
} = createOrderController();

router.use(authenticateJwt);

dealerOrderRouter.get('/', dealerOrderController.getAllAvailableOrders);
dealerOrderRouter.patch('/:orderId/accept', requireRole(['dealer']), dealerOrderController.accepOrder);
dealerOrderRouter.get('/:orderId/location', dealerOrderController.getOrderLocationInfo)
dealerOrderRouter.get('/:orderId', dealerOrderController.getOrderDetails);
dealerOrderRouter.patch('/:orderId', requireRole(['dealer']), dealerOrderController.markOrderAsDelivered);

router.use('/delivery', dealerOrderRouter);

export default router;
