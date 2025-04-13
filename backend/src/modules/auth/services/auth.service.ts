import { validateDto } from '../../../core/common/validation';
import { AppError, NotFoundError, UnauthorizedError, ValidationError } from '../../../core/errors/app.error';
import { UserService } from '../../users/services/user.service';
import { LoginDto } from '../dtos/login.dto';
import { RegisterDto } from '../dtos/register.dto';
import { AuthProviderRepository } from '../repositories/auth-provider.repository';
import { generateToken } from '../strategies/jwt.strategy';
import { hashPassword, verifyPassword } from '../utils/hash.util';

export class AuthService {
  constructor(
    private authProviderRepository: AuthProviderRepository,
    private userService: UserService,
  ) { }

  async register(data: RegisterDto) {
    await validateDto(RegisterDto, data);

    const { email, name } = data;
    const user = await this.userService.create({ email, name });
    const passwordHash = await hashPassword(data.password);

    const authProvider = await this.authProviderRepository.createLocal(user.id, passwordHash);
    if (!authProvider) {
      throw new AppError({
        publicMessage: 'Error al registrar usuario',
        internalMessage: `No se pudo crear el proveedor de autenticación para el usuario con ID ${user.id}`,
      });
    }

    const token = generateToken({ user_id: user.id });

    return {
      ...authProvider,
      access_token: token,
    };
  }

  async login(data: LoginDto) {
    await validateDto(LoginDto, data);

    const user = await this.userService.findByEmail({ email: data.email });
    if (!user) {
      throw new NotFoundError({
        publicMessage: 'Usuario no encontrado',
        internalMessage: `No se encontró el usuario con email ${data.email}`,
      });
    }

    const authProvider = await this.authProviderRepository.findByUserId(user.id);
    if (!authProvider) {
      throw new NotFoundError({
        publicMessage: 'Usuario no encontrado',
        internalMessage: `Proveedor de autenticación no encontrado para el id: ${user.id}`,
      });
    }

    const passwordMatch = await verifyPassword(data.password, authProvider.password_hash || '');
    if (!passwordMatch) {
      throw new UnauthorizedError({
        internalMessage: `Las credenciales no son correctas`,
      });
    }

    const payload = { user_id: user.id };
    const token = generateToken(payload);

    return {
      access_token: token,
    };
  }
}
