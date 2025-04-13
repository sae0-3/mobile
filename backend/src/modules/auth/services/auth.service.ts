import { validateDto } from '../../../core/common/validation';
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

    const existing = await this.userService.findByEmail({ email: data.email });

    if (existing) {
      throw new Error('Email ya fue registrado');
    }

    const { email, name } = data
    const user = await this.userService.create({ email, name });

    const passwordHash = await hashPassword(data.password);
    const authProvider = await this.authProviderRepository.createLocal(user.id, passwordHash);

    if (!authProvider) {
      throw new Error('Error al registrar proveedor de autenticación');
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
      throw new Error('Usuario no encontrado');
    }

    const authProvider = await this.authProviderRepository.findByUserId(user.id);
    if (!authProvider) {
      throw new Error('Proveedor de autenticación no encontrado');
    }

    const passwordMatch = await verifyPassword(data.password, authProvider.password_hash || '');
    if (!passwordMatch) {
      throw new Error('Credenciales inválidas');
    }

    const payload = { user_id: user.id };
    const token = generateToken(payload);

    return {
      access_token: token,
    };
  }
}
