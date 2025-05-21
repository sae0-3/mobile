import { AppError, NotFoundError } from '../../../core/errors/app.error';
import { CreateClientDto } from '../dtos/client.dto';
import { ClientRepository } from '../repositories/client.repository';
import { ClientService } from '../services/client.service';
import { UserService } from '../services/user.service';

describe('ClientService', () => {
  let service: ClientService;
  let repository: jest.Mocked<ClientRepository>;
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

    service = new ClientService(repository, userService);
  });

  const createdUser = {
    id: 'client-id',
    email: 'client@example.com',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const createdClient = {
    id: 'client-id',
    email: 'client@example.com',
    name: 'Client Name',
    phone: '12345678',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  describe('findAll()', () => {
    it('debería retornar todos los clientes', async () => {
      const clients = [createdClient];

      repository.findAll.mockResolvedValue(clients);

      const result = await service.findAll();

      expect(result).toEqual(clients);
      expect(repository.findAll).toHaveBeenCalled();
    });
  });

  describe('findById()', () => {
    it('debería retornar el cliente si existe', async () => {
      repository.findById.mockResolvedValue(createdClient);

      const result = await service.findById('client-id');

      expect(result).toEqual(createdClient);
      expect(repository.findById).toHaveBeenCalledWith('client-id');
    });

    it('debería lanzar error si el id no se provee', async () => {
      await expect(service.findById('')).rejects.toThrow(NotFoundError);
    });

    it('debería lanzar error si el cliente no existe', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(service.findById('nonexistent')).rejects.toThrow(NotFoundError);
    });
  });

  describe('create()', () => {
    const createClientDto: CreateClientDto = {
      email: 'client@example.com',
      name: 'Client Name',
      phone: '123456789',
    };

    it('debería crear un cliente', async () => {
      userService.create.mockResolvedValue(createdUser);
      repository.create.mockResolvedValue(createdClient);

      const result = await service.create(createClientDto);

      expect(result).toEqual({
        ...createdUser,
        ...createdClient,
      });

      expect(userService.create).toHaveBeenCalledWith({
        email: createClientDto.email,
      });

      expect(repository.create).toHaveBeenCalledWith({
        user_id: 'client-id',
        name: createClientDto.name,
        phone: createClientDto.phone,
      });
    });

    it('debería lanzar error si no se puede crear el cliente', async () => {
      userService.create.mockResolvedValue(createdUser);
      repository.create.mockResolvedValue(null);

      await expect(service.create(createClientDto))
        .rejects.toThrow(AppError);

      expect(userService.create).toHaveBeenCalled();
      expect(repository.create).toHaveBeenCalled();
    });

    it('debería lanzar error si el email es inválido', async () => {
      const invalidDto = { ...createClientDto, email: 'no-valid-email' };

      await expect(service.create(invalidDto)).rejects.toThrow(/email/i);
    });

    it('debería lanzar error si falta el email', async () => {
      const invalidDto = { ...createClientDto, email: '' };

      await expect(service.create(invalidDto)).rejects.toThrow(/email/i);
    });
  });

  describe('update()', () => {
    const updateDto = {
      name: 'New Name',
      phone: '987654321',
      email: 'newemail@example.com',
    };

    it('debería actualizar cliente correctamente', async () => {
      repository.findById.mockResolvedValue(createdClient);
      userService.update.mockResolvedValue({ ...createdUser, ...updateDto });
      repository.update.mockResolvedValue({ ...createdClient, ...updateDto });

      const result = await service.update('client-id', updateDto);

      expect(result).toEqual({ ...createdClient, ...updateDto });
      expect(userService.update).toHaveBeenCalledWith('client-id', { email: 'newemail@example.com' });
      expect(repository.update).toHaveBeenCalledWith('client-id', {
        name: 'New Name',
        phone: '987654321',
      });
    });

    it('debería lanzar error si el cliente no existe', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(service.update('nonexistent', updateDto)).rejects.toThrow(NotFoundError);
    });

    it('debería lanzar error si falla actualización de usuario', async () => {
      userService.update.mockRejectedValue(new AppError({}));

      await expect(service.update('client-id', updateDto)).rejects.toThrow(AppError);
    });

    it('debería lanzar error si falla actualización de cliente', async () => {
      userService.update.mockResolvedValue({ ...createdUser });
      repository.update.mockResolvedValue(null);

      await expect(service.update('client-id', updateDto)).rejects.toThrow(AppError);
    });
  });

  describe('delete()', () => {
    it('debería eliminar el cliente si existe', async () => {
      userService.delete.mockResolvedValue(createdUser);

      const result = await service.delete('client-id');

      expect(result).toBe('client-id');
      expect(userService.delete).toHaveBeenCalledWith('client-id');
    });

    it('debería lanzar error si no se proporciona id', async () => {
      await expect(service.delete('')).rejects.toThrow(NotFoundError);
    });

    it('debería lanzar error si la eliminación falla', async () => {
      userService.delete.mockRejectedValue(new AppError({}));

      await expect(service.delete('client-id')).rejects.toThrow(AppError);
    });
  });
});
