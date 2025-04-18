import { UserRepository } from '../users/repositories/user.repository';
import { UserService } from '../users/services/user.service';
import { AuthController } from './controllers/auth.controller';
import { AuthProviderRepository } from './repositories/auth-provider.repository';
import { AuthService } from './services/auth.service';

export function createAuthController(): AuthController {
  const userRepository = new UserRepository();
  const authProviderRepository = new AuthProviderRepository();
  const userService = new UserService(userRepository);
  const authService = new AuthService(authProviderRepository, userService);

  return new AuthController(authService);
}
