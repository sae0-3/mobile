import { AdminRepository } from '../users/repositories/admin.repository';
import { ClientRepository } from '../users/repositories/client.repository';
import { DealerRepository } from '../users/repositories/dealer.repository';
import { UserRepository } from '../users/repositories/user.repository';
import { AdminService } from '../users/services/admin.service';
import { ClientService } from '../users/services/client.service';
import { DealerService } from '../users/services/dealer.service';
import { UserService } from '../users/services/user.service';
import { AuthController } from './controllers/auth.controller';
import { AuthProviderRepository } from './repositories/auth-provider.repository';
import { AuthService } from './services/auth.service';

export function createAuthController(): AuthController {
  const userRepository = new UserRepository();
  const clientRepository = new ClientRepository();
  const dealerRepository = new DealerRepository();
  const adminRepository = new AdminRepository();
  const authProviderRepository = new AuthProviderRepository();

  const userService = new UserService(userRepository);
  const clientService = new ClientService(clientRepository, userService);
  const dealerService = new DealerService(dealerRepository, userService);
  const adminService = new AdminService(adminRepository, userService);
  const authService = new AuthService(
    authProviderRepository,
    userService,
    clientService,
    dealerService,
    adminService,
  );

  return new AuthController(authService);
}
