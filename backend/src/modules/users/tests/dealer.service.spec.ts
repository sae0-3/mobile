import { AppError, NotFoundError } from '../../../core/errors/app.error';
import { CreateDealerDto } from '../dtos/dealer.dto';
import { DealerRepository } from '../repositories/dealer.repository';
import { DealerService } from '../services/dealer.service';
import { UserService } from '../services/user.service';

describe('DealerService', () => {
  let service: DealerService;
  let repository: jest.Mocked<DealerRepository>;
  let userService: jest.Mocked<UserService>;

  beforeEach(() => {
    repository = {
      findAll: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as any;

    userService = {
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as any;

    service = new DealerService(repository, userService);
  });

  const createdUser = {
    id: 'dealer-id',
    email: 'dealer@example.com',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const createdDealer = {
    ...createdUser,
    name: "Dealer",
    vehicle: 'motorcycle' as const,
  };

  describe('findAll()', () => {
    it('debería retornar todos los dealers', async () => {
      repository.findAll.mockResolvedValue([createdDealer]);

      const result = await service.findAll();

      expect(result).toEqual([createdDealer]);
      expect(repository.findAll).toHaveBeenCalled();
    });
  });

  describe('findById()', () => {
    it('debería retornar el dealer si existe', async () => {
      repository.findById.mockResolvedValue(createdDealer);

      const result = await service.findById('dealer-id');

      expect(result).toEqual(createdDealer);
      expect(repository.findById).toHaveBeenCalledWith('dealer-id');
    });

    it('debería lanzar error si el id está vacío', async () => {
      await expect(service.findById('')).rejects.toThrow(NotFoundError);
    });

    it('debería lanzar error si no se encuentra el dealer', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(service.findById('nonexistent')).rejects.toThrow(NotFoundError);
    });
  });

  describe('create()', () => {
    const createDto: CreateDealerDto = {
      name: "Dealer",
      email: 'dealer@example.com',
      vehicle: 'motorcycle',
    };

    it('debería crear un dealer', async () => {
      userService.create.mockResolvedValue(createdUser);
      repository.create.mockResolvedValue(createdDealer);

      const result = await service.create(createDto);

      expect(userService.create).toHaveBeenCalledWith({ email: createDto.email });
      expect(repository.create).toHaveBeenCalledWith({
        user_id: createdUser.id,
        name: createDto.name,
        vehicle: createDto.vehicle,
      });
      expect(result).toEqual(createdDealer);
    });

    it('debería lanzar error si no se puede crear dealer', async () => {
      userService.create.mockResolvedValue(createdUser);
      repository.create.mockResolvedValue(null);

      await expect(service.create(createDto)).rejects.toThrow(AppError);
    });

    it('debería lanzar error si el email es inválido', async () => {
      const invalidDto = { ...createDto, email: 'no-valid-email' };
      await expect(service.create(invalidDto)).rejects.toThrow(/email/i);
    });

    it('debería lanzar error si el email está vacío', async () => {
      const invalidDto = { ...createDto, email: '' };
      await expect(service.create(invalidDto)).rejects.toThrow(/email/i);
    });
  });

  describe('update()', () => {
    const updateDto = {
      email: 'newdealer@example.com',
      vehicle: 'car' as const,
    };

    it('debería actualizar el dealer correctamente', async () => {
      repository.findById.mockResolvedValue(createdDealer);
      userService.update.mockResolvedValue({ ...createdUser, email: updateDto.email });
      repository.update.mockResolvedValue({ ...createdDealer, ...updateDto });

      const result = await service.update('dealer-id', updateDto);

      expect(userService.update).toHaveBeenCalledWith('dealer-id', { email: updateDto.email });
      expect(repository.update).toHaveBeenCalledWith('dealer-id', { vehicle: updateDto.vehicle });
      expect(result).toEqual({ ...createdDealer, ...updateDto });
    });

    it('debería lanzar error si el dealer no existe', async () => {
      repository.findById.mockResolvedValue(null);
      await expect(service.update('nonexistent', updateDto)).rejects.toThrow(NotFoundError);
    });

    it('debería lanzar error si falla la actualización del usuario', async () => {
      repository.findById.mockResolvedValue(createdDealer);
      userService.update.mockRejectedValue(new AppError({}));

      await expect(service.update('dealer-id', updateDto)).rejects.toThrow(AppError);
    });

    it('debería lanzar error si falla la actualización del dealer', async () => {
      repository.findById.mockResolvedValue(createdDealer);
      userService.update.mockResolvedValue({ ...createdUser });
      repository.update.mockResolvedValue(null);

      await expect(service.update('dealer-id', updateDto)).rejects.toThrow(AppError);
    });
  });

  describe('delete()', () => {
    it('debería eliminar el dealer si existe', async () => {
      userService.delete.mockResolvedValue(createdUser);

      const result = await service.delete('dealer-id');

      expect(userService.delete).toHaveBeenCalledWith('dealer-id');
      expect(result).toBe('dealer-id');
    });

    it('debería lanzar error si no se proporciona id', async () => {
      await expect(service.delete('')).rejects.toThrow(NotFoundError);
    });

    it('debería lanzar error si falla la eliminación', async () => {
      userService.delete.mockRejectedValue(new AppError({}));

      await expect(service.delete('dealer-id')).rejects.toThrow(AppError);
    });
  });
});
