import { AppError, NotFoundError } from '../../../core/errors/app.error';
import { UserService } from '../../users/services/user.service';
import { User } from '../../users/types/user.type';
import { LoginDto } from '../dtos/login.dto';
import { RegisterAdminDto, RegisterClientDto, RegisterDealerDto } from '../dtos/register.dto';
import { AuthProviderRepository } from '../repositories/auth-provider.repository';
import { AuthService } from '../services/auth.service';
import { AuthProvider } from '../types/auth-provider.type';
import * as hashUtil from '../utils/hash.util';

jest.mock('../utils/hash.util', () => ({
  hashPassword: jest.fn((plain) => Promise.resolve(`hashed_${plain}`)),
  verifyPassword: jest.fn((plain, hash) => Promise.resolve(hash === `hashed_${plain}`)),
}));

jest.mock('../strategies/jwt.strategy', () => ({
  generateToken: jest.fn(() => 'fake.jwt.token'),
}));

describe('AuthService', () => {
  let authService: AuthService;
  let userService: jest.Mocked<UserService>;
  let authRepo: jest.Mocked<AuthProviderRepository>;
  let clientService: any;
  let dealerService: any;
  let adminService: any;

  beforeEach(() => {
    authRepo = {
      createLocal: jest.fn(),
      findByUserId: jest.fn(),
    } as any;

    userService = {
      create: jest.fn(),
      findByEmail: jest.fn(),
      getRoleById: jest.fn().mockResolvedValue({ role: 'client' }),
    } as any;

    clientService = {
      create: jest.fn(),
    };

    dealerService = {
      create: jest.fn(),
    };

    adminService = {
      create: jest.fn(),
    };

    authService = new AuthService(
      authRepo,
      userService,
      clientService,
      dealerService,
      adminService
    );
  });

  describe('registerClient()', () => {
    const validRegisterDto: RegisterClientDto = {
      email: 'test@example.com',
      password: 'ValidPass123!',
      name: 'Test User',
      phone: '123456789'
    };

    it('registra correctamente un cliente nuevo', async () => {
      clientService.create.mockResolvedValue({
        id: '1',
        email: validRegisterDto.email,
        name: validRegisterDto.name,
        phone: validRegisterDto.phone,
        created_at: new Date(),
        updated_at: new Date()
      });

      authRepo.createLocal.mockResolvedValue({
        id: '1',
        user_id: '1',
        password_hash: 'hashed_ValidPass123!',
        provider: 'local',
        created_at: new Date(),
        updated_at: new Date()
      });

      const result = await authService.registerClient(validRegisterDto);

      expect(clientService.create).toHaveBeenCalledWith({
        email: validRegisterDto.email,
        name: validRegisterDto.name,
        phone: validRegisterDto.phone
      });

      expect(hashUtil.hashPassword).toHaveBeenCalledWith(validRegisterDto.password);
      expect(authRepo.createLocal).toHaveBeenCalledWith('1', 'hashed_ValidPass123!');

      expect(result).toEqual({
        id: '1',
        email: validRegisterDto.email,
        role: 'client',
        access_token: 'fake.jwt.token'
      });
    });

    it('lanza error si el email ya existe', async () => {
      clientService.create.mockRejectedValue(
        new AppError({
          publicMessage: 'El usuario con email test@example.com ya existe',
        })
      );

      await expect(authService.registerClient(validRegisterDto))
        .rejects.toThrow(/email/i);
    });

    it('lanza error si el email es inválido', async () => {
      await expect(authService.registerClient({ ...validRegisterDto, email: 'bademail' }))
        .rejects.toThrow(/email.*inválido|invalid email/i);
    });

    it('lanza error si la contraseña es débil', async () => {
      await expect(authService.registerClient({ ...validRegisterDto, password: '123' }))
        .rejects.toThrow(/contraseña/i);
    });

    it('lanza error si el email o la contraseña están vacíos', async () => {
      const invalidRegisterDto = {
        ...validRegisterDto,
        email: '',
        password: '',
      };

      await expect(authService.registerClient(invalidRegisterDto))
        .rejects.toThrow(/^(?=.*\bemail\b)(?=.*\bpassword\b)/i);
    });
  });

  describe('registerDealer()', () => {
    const validRegisterDto: RegisterDealerDto = {
      email: 'dealer@example.com',
      password: 'ValidPass123!',
      name: 'Test Dealer',
      vehicle: 'car'
    };

    it('registra correctamente un dealer nuevo', async () => {
      dealerService.create.mockResolvedValue({
        id: '2',
        email: validRegisterDto.email,
        name: validRegisterDto.name,
        vehicle: validRegisterDto.vehicle,
        created_at: new Date(),
        updated_at: new Date()
      });

      authRepo.createLocal.mockResolvedValue({
        id: '2',
        user_id: '2',
        password_hash: 'hashed_ValidPass123!',
        provider: 'local',
        created_at: new Date(),
        updated_at: new Date()
      });

      const result = await authService.registerDealer(validRegisterDto);

      expect(dealerService.create).toHaveBeenCalledWith({
        email: validRegisterDto.email,
        name: validRegisterDto.name,
        vehicle: validRegisterDto.vehicle
      });

      expect(result).toEqual({
        id: '2',
        email: validRegisterDto.email,
        role: 'dealer',
        access_token: 'fake.jwt.token'
      });
    });
  });

  describe('registerAdmin()', () => {
    const validRegisterDto: RegisterAdminDto = {
      email: 'admin@example.com',
      password: 'ValidPass123!'
    };

    it('registra correctamente un admin nuevo', async () => {
      adminService.create.mockResolvedValue({
        id: '3',
        email: validRegisterDto.email,
        created_at: new Date(),
        updated_at: new Date()
      });

      authRepo.createLocal.mockResolvedValue({
        id: '3',
        user_id: '3',
        password_hash: 'hashed_ValidPass123!',
        provider: 'local',
        created_at: new Date(),
        updated_at: new Date()
      });

      const result = await authService.registerAdmin(validRegisterDto);

      expect(adminService.create).toHaveBeenCalledWith({
        email: validRegisterDto.email
      });

      expect(result).toEqual({
        id: '3',
        email: validRegisterDto.email,
        role: 'admin',
        access_token: 'fake.jwt.token'
      });
    });
  });

  describe('login()', () => {
    const validLoginDto: LoginDto = {
      email: 'test@example.com',
      password: 'ValidPass123!',
    };

    const mockUser: User = {
      id: '1',
      email: validLoginDto.email,
      created_at: new Date().toString(),
      updated_at: new Date().toString()
    };

    const mockAuthProvider: AuthProvider = {
      id: '1',
      user_id: '1',
      provider: 'local',
      password_hash: 'hashed_ValidPass123!',
      created_at: new Date(),
      updated_at: new Date()
    };

    it('debería retornar un token si el login es exitoso', async () => {
      userService.findByEmail.mockResolvedValue(mockUser);
      authRepo.findByUserId.mockResolvedValue(mockAuthProvider);
      userService.getRoleById.mockResolvedValue({ role: 'client' });

      const result = await authService.login(validLoginDto);

      expect(result).toEqual({
        id: '1',
        email: validLoginDto.email,
        role: 'client',
        access_token: 'fake.jwt.token'
      });
    });

    it('lanza error si el usuario no existe', async () => {
      userService.findByEmail.mockRejectedValue(
        new NotFoundError({
          publicMessage: 'Usuario no encontrado',
        })
      );

      await expect(authService.login(validLoginDto))
        .rejects.toThrow('Usuario no encontrado');
    });

    it('lanza error si la contraseña no coincide', async () => {
      userService.findByEmail.mockResolvedValue(mockUser);
      authRepo.findByUserId.mockResolvedValue(mockAuthProvider);
      (hashUtil.verifyPassword as jest.Mock).mockResolvedValue(false);

      await expect(authService.login(validLoginDto)).rejects.toThrow(/credenciales/i);
    });

    it('lanza error si el email es inválido', async () => {
      const dto = { ...validLoginDto, email: 'bad-email' };
      await expect(authService.login(dto as any)).rejects.toThrow(/email/i);
    });

    it('lanza error si el proveedor de autenticación no existe', async () => {
      userService.findByEmail.mockResolvedValue(mockUser);
      authRepo.findByUserId.mockResolvedValue(null);

      await expect(authService.login(validLoginDto))
        .rejects.toThrow(/proveedor/i);
    });

    it('lanza error si el email y contraseña están vacíos', async () => {
      const emptyLogin: LoginDto = { email: '', password: '' };

      await expect(authService.login(emptyLogin))
        .rejects.toThrow(/email.*password|credenciales/i);
    });
  });
});
