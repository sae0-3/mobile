import { ClientRepository } from '../users/repositories/client.repository';
import { UserRepository } from '../users/repositories/user.repository';
import { ClientService } from '../users/services/client.service';
import { UserService } from '../users/services/user.service';
import { AuthController } from './controllers/auth.controller';
import { AuthProviderRepository } from './repositories/auth-provider.repository';
import { AuthService } from './services/auth.service';

export function createAuthController(): AuthController {
  const userRepository = new UserRepository();
  const clientRepository = new ClientRepository();
  const authProviderRepository = new AuthProviderRepository();

  const userService = new UserService(userRepository);
  const clientService = new ClientService(clientRepository, userService);
  const authService = new AuthService(authProviderRepository, userService, clientService);

  return new AuthController(authService);
}
