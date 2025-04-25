import { validateDto } from '../../../core/common/validation';
import { AppError, NotFoundError, ValidationError } from '../../../core/errors/app.error';
import { CategoryInsertDto } from '../dtos/category.dto';
import { CategoryRepository } from '../repositories/category.repository';
import { CategoryService } from '../services/category.service';
import { Category } from '../types/category.type';
import { Product } from '../types/product.type';

jest.mock('../../../core/common/validation', () => ({
  validateDto: jest.fn().mockResolvedValue(undefined),
}));

describe('CategoryService', () => {
  let service: CategoryService;
  let repository: jest.Mocked<CategoryRepository>;

  const validCategory: Category = {
    id: '1',
    name: 'Bebidas',
    visible: true,
    display_order: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const validDto: CategoryInsertDto = {
    name: 'Bebidas',
    visible: true,
    display_order: 1,
  };

  beforeEach(() => {
    repository = {
      findAll: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findProductsByCategoryId: jest.fn(),
    } as any;

    service = new CategoryService(repository);
    jest.resetAllMocks();
  });

  describe('findAll()', () => {
    it('debería devolver todas las categorías', async () => {
      const categories = [validCategory];
      repository.findAll.mockResolvedValue(categories);

      const result = await service.findAll(false);
      expect(repository.findAll).toHaveBeenCalledWith(false);
      expect(result).toEqual(categories);
    });

    it('devuelve un arreglo vacío si no hay categorías', async () => {
      repository.findAll.mockResolvedValue([]);

      const result = await service.findAll(true);

      expect(repository.findAll).toHaveBeenCalledWith(true);
      expect(result).toEqual([]);
    });
  });

  describe('findById()', () => {
    it('devuelve la categoría si existe', async () => {
      repository.findById.mockResolvedValue(validCategory);

      const result = await service.findById('1', false);

      expect(repository.findById).toHaveBeenCalledWith('1', false);
      expect(result).toEqual(validCategory);
    });

    it('lanza NotFoundError si no existe', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(service.findById('404', false)).rejects.toThrow(NotFoundError);
      expect(repository.findById).toHaveBeenCalledWith('404', false);
    });
  });

  describe('create()', () => {
    it('crea y devuelve la categoría', async () => {
      repository.create.mockResolvedValue(validCategory);

      const result = await service.create(validDto);

      expect(validateDto).toHaveBeenCalledWith(CategoryInsertDto, validDto);
      expect(repository.create).toHaveBeenCalledWith(validDto);
      expect(result).toEqual(validCategory);
    });

    it('lanza ValidationError si los datos son inválidos', async () => {
      const invalidDto = { name: '' };

      (validateDto as jest.Mock).mockImplementation(async () => {
        throw new ValidationError({ internalMessage: 'name - Campo requerido' });
      });

      await expect(service.create(invalidDto as any)).rejects.toThrow(ValidationError);
      expect(repository.create).not.toHaveBeenCalled();
    });

    it('lanza AppError si la creación falla', async () => {
      repository.create.mockResolvedValue(null);

      await expect(service.create(validDto)).rejects.toThrow(AppError);
      expect(repository.create).toHaveBeenCalledWith(validDto);
    });
  });

  describe('update()', () => {
    it('actualiza y devuelve la categoría', async () => {
      const updatedCategory = { ...validCategory, name: 'Nueva' };
      repository.update.mockResolvedValue(updatedCategory);

      const result = await service.update('1', { name: 'Nueva' });

      expect(repository.update).toHaveBeenCalledWith('1', { name: 'Nueva' });
      expect(result).toEqual(updatedCategory);
    });

    it('lanza NotFoundError si no se encuentra la categoría', async () => {
      repository.update.mockResolvedValue(null);

      await expect(service.update('x', { name: 'Nueva' })).rejects.toThrow(NotFoundError);
    });

    it('lanza ValidationError si los datos son inválidos', async () => {
      (validateDto as jest.Mock).mockImplementation(async () => {
        throw new ValidationError({ internalMessage: 'name - Campo requerido' });
      });

      await expect(service.update('1', { name: '' } as any)).rejects.toThrow(ValidationError);
      expect(repository.update).not.toHaveBeenCalled();
    });
  });

  describe('delete()', () => {
    it('devuelve la categoría eliminada si existía', async () => {
      repository.delete.mockResolvedValue(validCategory);

      const result = await service.delete('1');
      expect(repository.delete).toHaveBeenCalledWith('1');
      expect(result).toEqual(validCategory);
    });

    it('lanza NotFoundError si no se encuentra la categoría', async () => {
      repository.delete.mockResolvedValue(null);

      await expect(service.delete('1')).rejects.toThrow(NotFoundError);
    });
  });

  describe('findProductsByCategoryId()', () => {
    it('devuelve productos relacionados con la categoría', async () => {
      const products: Product[] = [
        {
          id: 'p1',
          name: 'Coca-Cola',
          description: null,
          img_reference: null,
          price: 6,
          available: true,
          ingredients: null,
          visible: true,
          display_order: 1,
          created_at: '',
          updated_at: '',
        },
      ];

      repository.findProductsByCategoryId.mockResolvedValue(products);

      const result = await service.findProductsByCategoryId('1', false);

      expect(repository.findProductsByCategoryId).toHaveBeenCalledWith('1', false);
      expect(result).toEqual(products);
    });

    it('devuelve un array vacío si no hay productos', async () => {
      repository.findProductsByCategoryId.mockResolvedValue([]);

      const result = await service.findProductsByCategoryId('2', true);

      expect(repository.findProductsByCategoryId).toHaveBeenCalledWith('2', true);
      expect(result).toEqual([]);
    });
  });
});
