import { Router } from 'express';
import { authenticateJwt, requireRole } from '../../core/common/middlewares';
import { createOrderController } from './orders.bootstrap';

const router = Router();

const orderRouter = Router();
const {
  orderController,
} = createOrderController();


router.use(authenticateJwt);
orderRouter.get('/', orderController.getAllAvailableOrders);
orderRouter.patch('/:orderId/accept', requireRole(['dealer']), orderController.accepOrder);
orderRouter.get('/:orderId/location', orderController.getOrderLocationInfo)
orderRouter.get('/:orderId', orderController.getOrderDetails);
orderRouter.patch('/:orderId', requireRole(['dealer']), orderController.markOrderAsDelivered);

router.use('/delivery', orderRouter);

export default router;