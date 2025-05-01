import { AdminController } from './controllers/admin.controller';
import { ClientController } from './controllers/client.controller';
import { DealerController } from './controllers/dealer.controller';
import { AdminRepository } from './repositories/admin.repository';
import { ClientRepository } from './repositories/client.repository';
import { DealerRepository } from './repositories/dealer.repository';
import { AdminService } from './services/admin.service';
import { ClientService } from './services/client.service';
import { DealerService } from './services/dealer.service';

export function createUsersController() {
  const clientRepository = new ClientRepository();
  const dealerRepository = new DealerRepository();
  const adminRepository = new AdminRepository();

  const clientService = new ClientService(clientRepository);
  const dealerService = new DealerService(dealerRepository);
  const adminService = new AdminService(adminRepository);

  const controller = {
    clientController: new ClientController(clientService),
    dealerController: new DealerController(dealerService),
    adminController: new AdminController(adminService)
  };

  return controller;
}
