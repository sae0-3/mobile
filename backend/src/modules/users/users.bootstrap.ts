import { AdminController } from './controllers/admin.controller';
import { ClientController } from './controllers/client.controller';
import { DealerController } from './controllers/dealer.controller';
import { AdminRepository } from './repositories/admin.repository';
import { ClientRepository } from './repositories/client.repository';
import { DealerRepository } from './repositories/dealer.repository';
import { UserRepository } from './repositories/user.repository';
import { AdminService } from './services/admin.service';
import { ClientService } from './services/client.service';
import { DealerService } from './services/dealer.service';
import { UserService } from './services/user.service';

export function createUsersController() {
  const userRepository = new UserRepository();
  const clientRepository = new ClientRepository();
  const dealerRepository = new DealerRepository();
  const adminRepository = new AdminRepository();

  const userService = new UserService(userRepository);
  const clientService = new ClientService(clientRepository, userService);
  const dealerService = new DealerService(dealerRepository, userService);
  const adminService = new AdminService(adminRepository, userService);

  const controller = {
    clientController: new ClientController(clientService),
    dealerController: new DealerController(dealerService),
    adminController: new AdminController(adminService)
  };

  return controller;
}
