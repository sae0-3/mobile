import { OrderController } from './controllers/order-dealer.controller';
import { OrderRepository } from './repositories/order-dealer.repository';
import { OrderService } from './services/order-dealer.service';

export function createOrderController() {
  const orderRepository = new OrderRepository();

  const orderService = new OrderService(orderRepository);

  const controller = {
    orderController: new OrderController(orderService),
  }

  return controller;
}

