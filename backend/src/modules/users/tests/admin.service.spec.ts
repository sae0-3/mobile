import { AppError, NotFoundError } from '../../../core/errors/app.error';
import { CreateAdminDto } from '../dtos/admin.dto';
import { AdminRepository } from '../repositories/admin.repository';
import { AdminService } from '../services/admin.service';
import { UserService } from '../services/user.service';
import { Admin } from '../types/admin.type';

describe('AdminService', () => {
  let service: AdminService;
  let repository: jest.Mocked<AdminRepository>;
  let userService: jest.Mocked<UserService>;

  beforeEach(() => {
    repository = {
      findById: jest.fn(),
      create: jest.fn(),
    } as any;

    userService = {
      create: jest.fn(),
      delete: jest.fn(),
    } as any;

    service = new AdminService(repository, userService);
  });

  const createdUser = {
    id: 'admin-id',
    email: 'admin@example.com',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const createdAdmin: Admin = {
    ...createdUser,
  };

  describe('findById()', () => {
    it('debería retornar el admin si existe', async () => {
      repository.findById.mockResolvedValue(createdAdmin);

      const result = await service.findById('admin-id');

      expect(result).toEqual(createdAdmin);
      expect(repository.findById).toHaveBeenCalledWith('admin-id');
    });

    it('debería lanzar NotFoundError si el id está vacío', async () => {
      await expect(service.findById('')).rejects.toThrow(NotFoundError);
    });

    it('debería lanzar NotFoundError si el admin no existe', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(service.findById('nonexistent-id')).rejects.toThrow(NotFoundError);
    });
  });

  describe('create()', () => {
    const validCreateDto: CreateAdminDto = {
      email: 'admin@example.com'
    };

    it('debería crear un admin correctamente', async () => {
      userService.create.mockResolvedValue(createdUser);
      repository.create.mockResolvedValue(createdAdmin);

      const result = await service.create(validCreateDto);

      expect(result).toEqual(createdAdmin);
      expect(userService.create).toHaveBeenCalledWith({
        email: validCreateDto.email
      });
      expect(repository.create).toHaveBeenCalledWith({
        user_id: createdUser.id
      });
    });

    it('debería lanzar error si el repositorio devuelve null', async () => {
      userService.create.mockResolvedValue(createdUser);
      repository.create.mockResolvedValue(null);

      await expect(service.create(validCreateDto)).rejects.toThrow(AppError);
    });

    it('debería validar el email con Zod', async () => {
      const invalidDto = { email: 'no-es-un-email' };

      await expect(service.create(invalidDto as any)).rejects.toThrow();
    });

    it('debería lanzar error si falla la creación del usuario', async () => {
      userService.create.mockRejectedValue(new Error('Error de usuario'));

      await expect(service.create(validCreateDto)).rejects.toThrow();
    });
  });

  describe('delete()', () => {
    it('debería eliminar el admin correctamente', async () => {
      userService.delete.mockResolvedValue(createdUser);

      const result = await service.delete('admin-id');

      expect(result).toBe('admin-id');
      expect(userService.delete).toHaveBeenCalledWith('admin-id');
    });

    it('debería lanzar NotFoundError si el id está vacío', async () => {
      await expect(service.delete('')).rejects.toThrow(NotFoundError);
    });

    it('debería lanzar error si falla la eliminación en UserService', async () => {
      userService.delete.mockRejectedValue(new AppError({}));

      await expect(service.delete('admin-id')).rejects.toThrow(AppError);
    });
  });
});
