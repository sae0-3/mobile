import { ProductRepository } from '../catalog/repositories/product.repository';
import { ProductService } from '../catalog/services/product.service';
import { ClientOrderController } from './controllers/client-order.controller';
import { DealerOrderController } from './controllers/dealer-order.controller';
import { ClientOrderRepository } from './repositories/client-order.repository';
import { DealerOrderRepository } from './repositories/dealer-order.repository';
import { OrderDetailsRepository } from './repositories/order-details.repository';
import { ClientOrderService } from './services/client-order.service';
import { DealerOrderService } from './services/dealer-order.service';
import { OrderDetailsService } from './services/order-details.service';

export function createOrderController() {
  const productRepository = new ProductRepository();
  const orderDetailsRepository = new OrderDetailsRepository();
  const dealerOrderRepository = new DealerOrderRepository();
  const clientOrderRepository = new ClientOrderRepository();

  const productService = new ProductService(productRepository);
  const dealerOrderService = new DealerOrderService(dealerOrderRepository);
  const orderDetailsService = new OrderDetailsService(orderDetailsRepository, productService);
  const clientOrderService = new ClientOrderService(clientOrderRepository, orderDetailsService);

  const controllers = {
    dealerOrderController: new DealerOrderController(dealerOrderService),
    clientOrderController: new ClientOrderController(clientOrderService),
  };

  return controllers;
}

