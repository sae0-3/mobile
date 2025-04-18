import { AppError } from '../../../core/errors/app.error';
import { UserService } from '../../users/services/user.service';
import { User } from '../../users/types/user.type';
import { LoginDto } from '../dtos/login.dto';
import { RegisterDto } from '../dtos/register.dto';
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

  beforeEach(() => {
    authRepo = {
      createLocal: jest.fn(),
      findByUserId: jest.fn(),
    } as any;

    userService = {
      create: jest.fn(),
      findByEmail: jest.fn(),
    } as any;

    authService = new AuthService(authRepo, userService);
  });

  describe('register()', () => {
    const validRegisterDto: RegisterDto = {
      email: 'test@example.com',
      password: 'ValidPass123!',
    };
    it('registra correctamente un usuario nuevo', async () => {
      userService.create.mockResolvedValue({
        id: '1',
        email: validRegisterDto.email,
        name: validRegisterDto.name,
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

      const result = await authService.register(validRegisterDto);

      expect(userService.create).toHaveBeenCalledWith({
        email: validRegisterDto.email,
      });

      expect(hashUtil.hashPassword).toHaveBeenCalledWith(validRegisterDto.password);
      expect(authRepo.createLocal).toHaveBeenCalledWith('1', 'hashed_ValidPass123!');

      expect(result).toEqual({
        id: '1',
        user_id: '1',
        provider: 'local',
        password_hash: 'hashed_ValidPass123!',
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
        access_token: expect.any(String),
      });
    });

    it('lanza error si el email ya existe', async () => {
      userService.create = jest.fn().mockRejectedValue(new AppError({
        internalMessage: 'El usuario con email test@example.com ya existe',
      }));

      await expect(authService.register(validRegisterDto))
        .rejects.toThrow(/email/i);
    });

    it('lanza error si el email es inválido', async () => {
      await expect(authService.register({ ...validRegisterDto, email: 'bademail' }))
        .rejects.toThrow(/.*email inválido/i);
    });

    it('lanza error si el email tiene caracteres especiales no permitidos', async () => {
      await expect(authService.register({ ...validRegisterDto, email: 'test@!example.com' }))
        .rejects.toThrow(/.*email inválido/i);
    });

    it('lanza error si la contraseña es débil', async () => {
      await expect(authService.register({ ...validRegisterDto, password: '123' }))
        .rejects.toThrow(/contraseña/i);
    });

    it('lanza error si el email o la contraseña están vacíos', async () => {
      const invalidRegisterDto: RegisterDto = {
        email: '',
        password: '',
      };

      await expect(authService.register(invalidRegisterDto))
        .rejects.toThrow(/^(?=.*\bemail\b)(?=.*\bpassword\b)/i);
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
      created_at: new Date(),
      updated_at: new Date()
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
      const loginDto: LoginDto = { email: 'test@example.com', password: 'secure123' };

      userService.findByEmail.mockResolvedValue(mockUser);
      authRepo.findByUserId.mockResolvedValue(mockAuthProvider);

      (hashUtil.verifyPassword as jest.Mock).mockResolvedValue(true);

      const result = await authService.login(loginDto);

      expect(result).toEqual({ access_token: 'fake.jwt.token' });
    });

    it('lanza error si el usuario no existe', async () => {
      userService.findByEmail.mockResolvedValue(null);

      await expect(authService.login(validLoginDto)).rejects.toThrow(/usuario/i);
    });

    it('lanza error si la contraseña no coincide', async () => {
      userService.findByEmail.mockResolvedValue(mockUser);
      authRepo.findByUserId.mockResolvedValue(mockAuthProvider);
      authRepo.createLocal.mockResolvedValue(mockAuthProvider);
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
