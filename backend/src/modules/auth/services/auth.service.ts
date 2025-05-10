import { validateDto } from '../../../core/common/validation';
import { AppError, NotFoundError, UnauthorizedError } from '../../../core/errors/app.error';
import { CustomJwtPayload } from '../../../core/types/custom-jwt-payload.type';
import { AdminService } from '../../users/services/admin.service';
import { ClientService } from '../../users/services/client.service';
import { DealerService } from '../../users/services/dealer.service';
import { UserService } from '../../users/services/user.service';
import { LoginDto } from '../dtos/login.dto';
import { RegisterAdminDto, RegisterClientDto, RegisterDealerDto } from '../dtos/register.dto';
import { AuthProviderRepository } from '../repositories/auth-provider.repository';
import { generateToken } from '../strategies/jwt.strategy';
import { hashPassword, verifyPassword } from '../utils/hash.util';

export class AuthService {
  constructor(
    private authProviderRepository: AuthProviderRepository,
    private userService: UserService,
    private clientService: ClientService,
    private dealerService: DealerService,
    private adminService: AdminService,
  ) { }

  async registerClient(data: RegisterClientDto) {
    await validateDto(RegisterClientDto, data);

    const { email, name, password } = data;
    const client = await this.clientService.create({ email, name });
    const passwordHash = await hashPassword(password);

    const authProvider = await this.authProviderRepository.createLocal(client.id, passwordHash);
    if (!authProvider) {
      throw new AppError({
        publicMessage: 'Error al registrar usuario',
        internalMessage: `No se pudo crear el proveedor de autenticación para el usuario con ID ${client.id}`,
      });
    }

    const payload: CustomJwtPayload = { id: client.id, email: client.email, role: 'client' };
    const token = generateToken(payload);

    return {
      ...payload,
      access_token: token,
    };
  }

  async registerDealer(data: RegisterDealerDto) {
    await validateDto(RegisterDealerDto, data);

    const { email, name, vehicle, password } = data;
    const dealer = await this.dealerService.create({ email, name, vehicle });
    const passwordHash = await hashPassword(password);

    const authProvider = await this.authProviderRepository.createLocal(dealer.id, passwordHash);
    if (!authProvider) {
      throw new AppError({
        publicMessage: 'Error al registrar usuario',
        internalMessage: `No se pudo crear el proveedor de autenticación para el usuario con ID ${dealer.id}`,
      });
    }

    const payload: CustomJwtPayload = { id: dealer.id, email: dealer.email, role: 'dealer' };
    const token = generateToken(payload);

    return {
      ...payload,
      access_token: token,
    };
  }

  async registerAdmin(data: RegisterAdminDto) {
    await validateDto(RegisterAdminDto, data);

    const { email, password } = data;
    const admin = await this.adminService.create({ email });
    const passwordHash = await hashPassword(password);

    const authProvider = await this.authProviderRepository.createLocal(admin.id, passwordHash);
    if (!authProvider) {
      throw new AppError({
        publicMessage: 'Error al registrar usuario',
        internalMessage: `No se pudo crear el proveedor de autenticación para el usuario con ID ${admin.id}`,
      });
    }

    const payload: CustomJwtPayload = { id: admin.id, email: admin.email, role: 'admin' };
    const token = generateToken(payload);

    return {
      ...payload,
      access_token: token,
    };
  }

  async login(data: LoginDto) {
    await validateDto(LoginDto, data);

    const user = await this.userService.findByEmail(data.email);
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

    const { role } = await this.userService.getRoleById(user.id);
    const payload: CustomJwtPayload = { id: user.id, email: user.email, role };
    const token = generateToken(payload);

    return {
      ...payload,
      access_token: token,
    };
  }
}
