import { validateDto } from '../../../core/common/validation';
import { AppError, NotFoundError, ValidationError } from '../../../core/errors/app.error';
import { ProductInsertDto } from '../dtos/product.dto';
import { ProductRepository } from '../repositories/product.repository';
import { ProductService } from '../services/product.service';
import { Category } from '../types/category.type';
import { Product } from '../types/product.type';

jest.mock('../../../core/common/validation', () => ({
  validateDto: jest.fn().mockResolvedValue(undefined),
}));

describe('ProductService', () => {
  let service: ProductService;
  let repository: jest.Mocked<ProductRepository>;

  beforeEach(() => {
    repository = {
      findAll: jest.fn(),
      findById: jest.fn(),
      findCategoriesByProductId: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as any;

    service = new ProductService(repository);

    jest.resetAllMocks();
  });

  const validProduct: Product = {
    id: '1',
    name: 'Test Name',
    description: null,
    img_reference: null,
    price: 999.99,
    available: true,
    ingredients: null,
    visible: true,
    display_order: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const validDto: ProductInsertDto = {
    name: 'Test Name',
    price: 999.99,
  };

  describe('findAll()', () => {
    it('debería devolver todos los productos del repositorio', async () => {
      const productB = { ...validProduct, id: '2', name: 'ProductB' };
      const mockProducts: Product[] = [validProduct, productB];

      repository.findAll.mockResolvedValue(mockProducts);
      const result = await service.findAll(false);

      expect(repository.findAll).toHaveBeenCalledWith(false);
      expect(result).toEqual(mockProducts);
    });

    it('debería devolver un arreglo vacío si no hay productos en el repositorio', async () => {
      repository.findAll.mockResolvedValue([]);

      const result = await service.findAll(false);

      expect(repository.findAll).toHaveBeenCalledWith(false);
      expect(result).toEqual([]);
    });
  });

  describe('findById()', () => {
    it('debería devolver el producto si existe', async () => {
      repository.findById.mockResolvedValue(validProduct);

      const result = await service.findById('1', false);

      expect(repository.findById).toHaveBeenCalledWith('1', false);
      expect(result).toEqual(validProduct);
    });

    it('debería lanzar NotFoundError si el producto no existe', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(service.findById('404', false)).rejects.toThrow(NotFoundError);
      expect(repository.findById).toHaveBeenCalledWith('404', false);
    });
  });

  describe('create()', () => {
    it('debería crear y devolver el producto si los datos son válidos', async () => {
      repository.create.mockResolvedValue(validProduct);

      const result = await service.create(validDto);

      expect(validateDto).toHaveBeenCalled();
      expect(repository.create).toHaveBeenCalledWith(validDto);
      expect(result).toEqual(validProduct);
    });

    it('debería lanzar ValidationError si los datos son inválidos', async () => {
      const invalidData = { ...validProduct, name: '' };

      (validateDto as jest.Mock).mockImplementation(async () => {
        throw new ValidationError({ internalMessage: 'name - Campo requerido' });
      });

      await expect(service.create(invalidData)).rejects.toThrow(ValidationError);
      expect(repository.create).not.toHaveBeenCalled();
    });

    it('debería lanzar AppError si el repositorio no devuelve el producto creado', async () => {
      repository.create.mockResolvedValue(null);

      await expect(service.create(validDto)).rejects.toThrow(AppError);
      expect(repository.create).toHaveBeenCalledWith(validDto);
    });
  });

  describe('update()', () => {
    it('debería actualizar el producto si existe', async () => {
      const updatedProduct = { ...validProduct, price: 899.99 };
      const updateData = { price: 899.99 };

      repository.update.mockResolvedValue(updatedProduct);

      const result = await service.update('1', updateData);

      expect(repository.update).toHaveBeenCalledWith('1', updateData);
      expect(result).toEqual(updatedProduct);
    });

    it('debería lanzar NotFoundError si el producto no existe', async () => {
      repository.update.mockResolvedValue(null);

      const updateData = { price: 899.99 };

      await expect(service.update('99', updateData)).rejects.toThrow(NotFoundError);
      expect(repository.update).toHaveBeenCalledWith('99', updateData);
    });

    it('debería lanzar ValidationError si los datos son inválidos', async () => {
      const invalidData = { price: -1 };

      (validateDto as jest.Mock).mockImplementation(async () => {
        throw new ValidationError({ internalMessage: 'price - Precio inválido' });
      });

      await expect(service.update('1', invalidData)).rejects.toThrow(ValidationError);
      expect(repository.update).not.toHaveBeenCalled();
    });

    it('debería lanzar NotFoundError si el producto no existe', async () => {
      const updateData = { price: 899.99 };

      repository.update.mockResolvedValue(null);

      await expect(service.update('1', updateData)).rejects.toThrow(NotFoundError);
      expect(repository.update).toHaveBeenCalledWith('1', updateData);
    });
  });

  describe('delete()', () => {
    it('debería devolver el producto eliminado si existía', async () => {
      repository.delete.mockResolvedValue(validProduct);

      const result = await service.delete('1');

      expect(repository.delete).toHaveBeenCalledWith('1');
      expect(result).toEqual(validProduct);
    });

    it('debería lanzar NotFoundError si el producto no existía', async () => {
      repository.delete.mockResolvedValue(null);

      await expect(service.delete('99')).rejects.toThrow(NotFoundError);
      expect(repository.delete).toHaveBeenCalledWith('99');
    });
  });

  describe('findCategoriesByProductId()', () => {
    it('devuelve las categorías asociadas al producto', async () => {
      const categories: Category[] = [
        { id: '1', name: 'Bebidas', visible: true, display_order: 1, created_at: '', updated_at: '' },
        { id: '2', name: 'Snacks', visible: false, display_order: 2, created_at: '', updated_at: '' },
      ];

      repository.findCategoriesByProductId.mockResolvedValue(categories);

      const result = await service.findCategoriesByProductId('prod-1', false);

      expect(repository.findCategoriesByProductId).toHaveBeenCalledWith('prod-1', false);
      expect(result).toEqual(categories);
    });

    it('devuelve lista vacía si no hay categorías asociadas', async () => {
      repository.findCategoriesByProductId.mockResolvedValue([]);

      const result = await service.findCategoriesByProductId('prod-x', false);

      expect(repository.findCategoriesByProductId).toHaveBeenCalledWith('prod-x', false);
      expect(result).toEqual([]);
    });
  });
});
