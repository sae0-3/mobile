import { DealerOrderController } from './controllers/dealer-order.controller';
import { DealerOrderRepository } from './repositories/dealer-order.repository';
import { DealerOrderService } from './services/dealer-order.service';

export function createOrderController() {
  const dealerOrderRepository = new DealerOrderRepository();

  const dealerOrderService = new DealerOrderService(dealerOrderRepository);

  const controllers = {
    dealerOrderController: new DealerOrderController(dealerOrderService),
  };

  return controllers;
}

