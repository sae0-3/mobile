import { UserService } from '../services/user.service';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../types/user.type';

describe('UserService', () => {
  let userService: UserService;
  let mockUserRepository: jest.Mocked<UserRepository>;

  beforeEach(() => {
    mockUserRepository = {
      create: jest.fn(),
      findByEmail: jest.fn(),
    } as any;

    userService = new UserService(mockUserRepository);
  });

  describe('create()', () => {
    it('debería crear un usuario con email y nombre', async () => {
      const newUser: User = {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
        created_at: new Date(),
        updated_at: new Date()
      };

      mockUserRepository.create.mockResolvedValue(newUser);

      const result = await userService.create({ email: 'test@example.com', name: 'Test User' });
      expect(result).toEqual(newUser);
      expect(mockUserRepository.create).toHaveBeenCalledWith('test@example.com', 'Test User');
    });

    it('debería crear un usuario sin nombre', async () => {
      const newUser: User = {
        id: '1',
        email: 'noname@example.com',
        name: undefined,
        created_at: new Date(),
        updated_at: new Date()
      };

      mockUserRepository.create.mockResolvedValue(newUser);

      const result = await userService.create({ email: 'noname@example.com' });
      expect(result).toEqual(newUser);
      expect(mockUserRepository.create).toHaveBeenCalledWith('noname@example.com', undefined);
    });

    it('no debería permitir crear un usuario si el email ya existe', async () => {
      mockUserRepository.findByEmail.mockResolvedValue({
        id: '1',
        email: 'existing@example.com',
        name: 'Test User',
        created_at: new Date(),
        updated_at: new Date()
      });

      await expect(userService.create({
        email: 'existing@example.com',
        name: 'Nuevo Usuario'
      })).rejects.toThrow(/email/i);

      expect(mockUserRepository.create).not.toHaveBeenCalled();
    });

    it('debería lanzar error si el email es vacío', async () => {
      await expect(userService.create({ email: '' })).rejects.toThrow();
    });

    it('debería propagar cualquier otro error del repositorio', async () => {
      mockUserRepository.create.mockRejectedValue(new Error('Fallo DB'));

      await expect(userService.create({ email: 'fail@example.com' }))
        .rejects.toThrow(/DB/i);
    });

    it('debería lanzar error si el email no es válido', async () => {
      await expect(userService.create({ email: 'not-an-email' }))
        .rejects.toThrow(/email/i);
    });

    it('debería lanzar error si el nombre es demasiado largo', async () => {
      const longName = 'a'.repeat(200);

      await expect(userService.create({ email: 'valid@example.com', name: longName }))
        .rejects.toThrow(/nombre/i);
    });

    it('debería lanzar error si el nombre está vacío', async () => {
      await expect(userService.create({ email: 'valid@example.com', name: '' }))
        .rejects.toThrow(/nombre/i);
    });
  });

  describe('findByEmail()', () => {
    it('debería devolver un usuario si el email existe', async () => {
      const user = {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
        created_at: new Date(),
        updated_at: new Date()
      };
      mockUserRepository.findByEmail.mockResolvedValue(user);

      const result = await userService.findByEmail({ email: 'test@example.com' });

      expect(result).toEqual(user);
      expect(mockUserRepository.findByEmail).toHaveBeenCalledWith('test@example.com');
    });

    it('debería devolver null si el email no existe', async () => {
      mockUserRepository.findByEmail.mockResolvedValue(null);

      const result = await userService.findByEmail({ email: 'noexists@example.com' });

      expect(result).toBeNull();
      expect(mockUserRepository.findByEmail).toHaveBeenCalledWith('noexists@example.com');
    });

    it('debería propagar errores si el repositorio falla', async () => {
      mockUserRepository.findByEmail.mockRejectedValue(new Error('Fallo DB'));

      await expect(userService.findByEmail({ email: 'fallo@example.com' }))
        .rejects.toThrow(/DB/i);
    });

    it('debería lanzar error si el email está vacío', async () => {
      await expect(userService.findByEmail({ email: '' }))
        .rejects.toThrow(/email/i);
    });

    it('debería lanzar error si el email no es válido', async () => {
      await expect(userService.findByEmail({ email: 'not-an-email' }))
        .rejects.toThrow(/email/i);
    });
  });
});
