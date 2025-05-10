import { UserRepository } from '../repositories/user.repository';
import { UserService } from '../services/user.service';
import { User } from '../types/user.type';

describe('UserService', () => {
  let service: UserService;
  let repository: jest.Mocked<UserRepository>;

  beforeEach(() => {
    repository = {
      create: jest.fn(),
      findByEmail: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as any;

    service = new UserService(repository);
  });

  const validUser: User = {
    id: '1',
    email: 'test@example.com',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  describe('create()', () => {
    it('debería crear un usuario', async () => {
      repository.create.mockResolvedValue(validUser);

      const result = await service.create({ email: 'test@example.com' });
      expect(result).toEqual(validUser);
      expect(repository.create).toHaveBeenCalledWith({ email: 'test@example.com' });
    });

    it('no debería permitir crear un usuario si el email ya existe', async () => {
      repository.findByEmail.mockResolvedValue(validUser);

      await expect(service.create({
        email: 'testg@example.com',
      })).rejects.toThrow(/email/i);

      expect(repository.create).not.toHaveBeenCalled();
    });

    it('debería lanzar error si el email es vacío', async () => {
      await expect(service.create({ email: '' })).rejects.toThrow();
    });

    it('debería lanzar error si el email no es válido', async () => {
      await expect(service.create({ email: 'not-an-email' }))
        .rejects.toThrow(/email/i);
    });
  });

  describe('findByEmail()', () => {
    it('debería devolver un usuario si el email existe', async () => {
      repository.findByEmail.mockResolvedValue(validUser);

      const result = await service.findByEmail('test@example.com');

      expect(result).toEqual(validUser);
      expect(repository.findByEmail).toHaveBeenCalledWith('test@example.com');
    });

    it('debería lanzar error si el email no existe', async () => {
      repository.findByEmail.mockResolvedValue(null);

      await expect(service.findByEmail('noexists@example.com')).
        rejects.toThrow(/no encontrado/i);
      expect(repository.findByEmail).toHaveBeenCalledWith('noexists@example.com');
    });

    it('debería lanzar error si el email está vacío', async () => {
      await expect(service.findByEmail(''))
        .rejects.toThrow(/email/i);
    });
  });

  describe('findById()', () => {
    it('debería devolver un usuario si el ID existe', async () => {
      repository.findById.mockResolvedValue(validUser);

      const result = await service.findById('1');
      expect(result).toEqual(validUser);
      expect(repository.findById).toHaveBeenCalledWith('1');
    });

    it('debería lanzar error si el ID no existe', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(service.findById('999'))
        .rejects.toThrow(/no encontrado/i);
      expect(repository.findById).toHaveBeenCalledWith('999');
    });

    it('debería lanzar error si el ID está vacío', async () => {
      await expect(service.findById('')).rejects.toThrow(/id/i);
    });
  });

  describe('update()', () => {
    it('debería actualizar el usuario correctamente', async () => {
      repository.findById.mockResolvedValue(validUser);
      repository.update.mockResolvedValue(validUser);

      const result = await service.update('1', { email: 'new@example.com' });

      expect(result).toEqual(validUser);
      expect(repository.update).toHaveBeenCalledWith('1', { email: 'new@example.com' });
    });

    it('debería lanzar error si el usuario no existe', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(service.update('999', { email: 'new@example.com' }))
        .rejects.toThrow(/no encontrado/i);
    });

    it('debería lanzar error si el ID está vacío', async () => {
      await expect(service.update('', { email: 'new@example.com' }))
        .rejects.toThrow(/id/i);
    });

    it('debería lanzar error si el email no es válido', async () => {
      repository.findById.mockResolvedValue(validUser);

      await expect(service.update('1', { email: 'invalid' }))
        .rejects.toThrow(/email/i);
    });

    it('debería permitir update con objeto vacío (sin cambios)', async () => {
      repository.findById.mockResolvedValue(validUser);
      repository.update.mockResolvedValue(validUser);

      const result = await service.update('1', {});
      expect(result).toEqual(validUser);
    });
  });

  describe('delete()', () => {
    it('debería eliminar un usuario existente', async () => {
      repository.findById.mockResolvedValue(validUser);
      repository.delete.mockResolvedValue(validUser);

      const result = await service.delete('1');
      expect(result).toEqual(validUser);
      expect(repository.delete).toHaveBeenCalledWith('1');
    });

    it('debería lanzar error si el usuario no existe', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(service.delete('999')).rejects.toThrow(/no encontrado/i);
    });

    it('debería lanzar error si el ID está vacío', async () => {
      await expect(service.delete('')).rejects.toThrow(/id/i);
    });
  });
});
