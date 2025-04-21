import { v4 as uuidv4 } from 'uuid';
import { AppError } from '../../../core/errors/app.error';
import { ProductCategoryDto } from '../dtos/product-category.dto';
import { ProductCategoryRepository } from '../repositories/product-category.repository';
import { ProductCategoryService } from '../services/product-category.service';
import { ProductCategory } from '../types/product-category.type';

describe('ProductCategoryService', () => {
  let repository: jest.Mocked<ProductCategoryRepository>;
  let service: ProductCategoryService;
  const validProductId = uuidv4();
  const validCategoryId = uuidv4();

  const productCategoryDto: ProductCategoryDto = {
    product_id: validProductId,
    category_id: validCategoryId,
  };

  const linkedProductCategory: ProductCategory = {
    product_id: validProductId,
    category_id: validCategoryId,
  };

  beforeEach(() => {
    repository = {
      linkProductToCategory: jest.fn(),
      unlinkProductFromCategory: jest.fn(),
    } as any;

    service = new ProductCategoryService(repository);
    jest.clearAllMocks();
  });

  describe('linkProductToCategory()', () => {
    it('debería vincular producto con categoría exitosamente', async () => {
      repository.linkProductToCategory.mockResolvedValue(linkedProductCategory);

      const result = await service.linkProductToCategory(productCategoryDto);

      expect(repository.linkProductToCategory).toHaveBeenCalledWith(productCategoryDto);
      expect(result).toEqual(linkedProductCategory);
    });

    it('lanza error si no se puede vincular el producto con la categoría', async () => {
      repository.linkProductToCategory.mockResolvedValue(null);

      await expect(service.linkProductToCategory(productCategoryDto)).rejects.toThrow(AppError);
    });
  });

  describe('unlinkProductFromCategory()', () => {
    it('debería desvincular producto de categoría exitosamente', async () => {
      repository.unlinkProductFromCategory.mockResolvedValue(linkedProductCategory);

      const result = await service.unlinkProductFromCategory(productCategoryDto);

      expect(repository.unlinkProductFromCategory).toHaveBeenCalledWith(productCategoryDto);
      expect(result).toEqual(linkedProductCategory);
    });

    it('lanza error si no se puede desvincular el producto de la categoría', async () => {
      repository.unlinkProductFromCategory.mockResolvedValue(null);

      await expect(service.unlinkProductFromCategory(productCategoryDto)).rejects.toThrow(AppError);
    });
  });

  it('lanza ValidationError si los UUIDs son inválidos', async () => {
    const invalidDto = {
      product_id: 'abc',
      category_id: '123',
    };

    await expect(service.linkProductToCategory(invalidDto as any)).rejects.toThrow('Datos inválidos');
  });
});
