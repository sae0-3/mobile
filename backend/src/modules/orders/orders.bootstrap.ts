import { ProductRepository } from '../catalog/repositories/product.repository';
import { ProductService } from '../catalog/services/product.service';
import { LocationRepository } from '../locations/repositories/location.repository';
import { LocationService } from '../locations/services/location.service';
import { ClientRepository } from '../users/repositories/client.repository';
import { UserRepository } from '../users/repositories/user.repository';
import { ClientService } from '../users/services/client.service';
import { UserService } from '../users/services/user.service';
import { ClientOrderController } from './controllers/client-order.controller';
import { DealerOrderController } from './controllers/dealer-order.controller';
import { ClientOrderRepository } from './repositories/client-order.repository';
import { DealerOrderRepository } from './repositories/dealer-order.repository';
import { OrderDetailsRepository } from './repositories/order-details.repository';
import { ClientOrderService } from './services/client-order.service';
import { DealerOrderService } from './services/dealer-order.service';
import { OrderDetailsService } from './services/order-details.service';

export function createOrderController() {
  const userRepository = new UserRepository();
  const clientRepository = new ClientRepository();
  const locationRepository = new LocationRepository();
  const productRepository = new ProductRepository();
  const orderDetailsRepository = new OrderDetailsRepository();
  const dealerOrderRepository = new DealerOrderRepository();
  const clientOrderRepository = new ClientOrderRepository();

  const userService = new UserService(userRepository);
  const clientService = new ClientService(clientRepository, userService);
  const locationService = new LocationService(locationRepository);
  const productService = new ProductService(productRepository);
  const orderDetailsService = new OrderDetailsService(orderDetailsRepository, productService);
  const dealerOrderService = new DealerOrderService(
    dealerOrderRepository,
    orderDetailsService,
    clientService,
    locationService,
  );
  const clientOrderService = new ClientOrderService(clientOrderRepository, orderDetailsService);

  const controllers = {
    dealerOrderController: new DealerOrderController(dealerOrderService),
    clientOrderController: new ClientOrderController(clientOrderService),
  };

  return controllers;
}

