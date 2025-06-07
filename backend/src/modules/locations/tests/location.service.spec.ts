import { validateDto } from '../../../core/common/validation';
import { AppError, NotFoundError, ValidationError } from '../../../core/errors/app.error';
import { LocationInsertDto } from '../dtos/location.dto';
import { LocationRepository } from '../repositories/location.repository';
import { LocationService } from '../services/location.service';
import { Location } from '../types/location.type';

jest.mock('../../../core/common/validation', () => ({
  validateDto: jest.fn().mockResolvedValue(undefined),
}));

describe('LocationService', () => {
  let service: LocationService;
  let repository: jest.Mocked<LocationRepository>;

  const mockLocation: Location = {
    id: 'loc1',
    user_id: 'user1',
    address: 'Av. Siempre Viva 123',
    latitud: -17.7856,
    longitud: -63.1809,
    created_at: new Date().toISOString(),
  };

  const validDto: LocationInsertDto = {
    address: 'Av. Siempre Viva 123',
    latitud: -17.7856,
    longitud: -63.1809,
  };

  beforeEach(() => {
    repository = {
      findAll: jest.fn(),
      findByid: jest.fn(),
      create: jest.fn(),
      delete: jest.fn(),
    } as any;

    service = new LocationService(repository);
    jest.resetAllMocks();
  });

  describe('findAll()', () => {
    it('debería retornar todas las ubicaciones de un usuario', async () => {
      const mockLocations: Location[] = [
        mockLocation,
        { ...mockLocation, id: 'loc2', address: 'Otra dirección' }
      ];

      repository.findAll.mockResolvedValue(mockLocations);

      const result = await service.findAll('user1');

      expect(repository.findAll).toHaveBeenCalledWith('user1');
      expect(result).toEqual(mockLocations);
    });

    it('debería lanzar NotFoundError si no se proporciona user_id', async () => {
      await expect(service.findAll('')).rejects.toThrow(NotFoundError);
      expect(repository.findAll).not.toHaveBeenCalled();
    });

    it('debería retornar array vacío si no hay ubicaciones', async () => {
      repository.findAll.mockResolvedValue([]);

      const result = await service.findAll('user1');

      expect(result).toEqual([]);
    });
  });

  describe('create()', () => {
    it('debería crear y retornar una nueva ubicación', async () => {
      repository.create.mockResolvedValue(mockLocation);

      const result = await service.create('user1', validDto);

      expect(validateDto).toHaveBeenCalledWith(expect.anything(), validDto);
      expect(repository.create).toHaveBeenCalledWith({
        ...validDto,
        user_id: 'user1'
      });
      expect(result).toEqual(mockLocation);
    });

    it('debería lanzar ValidationError si no se proporciona user_id', async () => {
      await expect(service.create('', validDto)).rejects.toThrow(ValidationError);
      expect(repository.create).not.toHaveBeenCalled();
    });

    it('debería lanzar ValidationError si los datos son inválidos', async () => {
      const invalidDto = { ...validDto, latitud: 'no-es-un-numero' as any };

      (validateDto as jest.Mock).mockRejectedValue(
        new ValidationError({ internalMessage: 'latitud debe ser un número' })
      );

      await expect(service.create('user1', invalidDto)).rejects.toThrow(ValidationError);
      expect(repository.create).not.toHaveBeenCalled();
    });

    it('debería lanzar AppError si el repositorio no devuelve la ubicación creada', async () => {
      repository.create.mockResolvedValue(null);

      await expect(service.create('user1', validDto)).rejects.toThrow(AppError);
    });
  });

  describe('delete()', () => {
    it('debería eliminar y retornar la ubicación', async () => {
      repository.delete.mockResolvedValue(mockLocation);

      const result = await service.delete('loc1', 'user1');

      expect(repository.delete).toHaveBeenCalledWith('loc1', 'user1');
      expect(result).toEqual(mockLocation);
    });

    it('debería lanzar NotFoundError si no se proporciona location_id o user_id', async () => {
      await expect(service.delete('', 'user1')).rejects.toThrow(NotFoundError);
      await expect(service.delete('loc1', '')).rejects.toThrow(NotFoundError);
      expect(repository.delete).not.toHaveBeenCalled();
    });

    it('debería lanzar NotFoundError si la ubicación no existe', async () => {
      repository.delete.mockResolvedValue(null);

      await expect(service.delete('loc1', 'user1')).rejects.toThrow(NotFoundError);
    });
  });

  describe('findById()', () => {
    it('debería retornar la ubicación si existe', async () => {
      repository.findByid.mockResolvedValue(mockLocation);

      const result = await service.findById('loc1', 'user1');

      expect(repository.findByid).toHaveBeenCalledWith('loc1', 'user1');
      expect(result).toEqual(mockLocation);
    });

    it('debería lanzar NotFoundError si no se proporciona location_id o user_id', async () => {
      await expect(service.findById('', 'user1')).rejects.toThrow(NotFoundError);
      await expect(service.findById('loc1', '')).rejects.toThrow(NotFoundError);
      expect(repository.findByid).not.toHaveBeenCalled();
    });

    it('debería lanzar NotFoundError si la ubicación no existe', async () => {
      repository.findByid.mockResolvedValue(null);

      await expect(service.findById('loc1', 'user1')).rejects.toThrow(NotFoundError);
    });
  });
});
