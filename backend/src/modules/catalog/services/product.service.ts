import { validateDto } from '../../../core/common/validation';
import { AppError, NotFoundError } from '../../../core/errors/app.error';
import { ProductInsertDto, ProductUpdateDto } from '../dtos/product.dto';
import { ProductRepository } from '../repositories/product.repository';
import { Category } from '../types/category.type';
import { Product } from '../types/product.type';

export class ProductService {
  constructor(
    private productRepository: ProductRepository,
  ) { }

  async findAll(isClient: boolean): Promise<Product[]> {
    return await this.productRepository.findAll(isClient);
  }

  async findById(id: string, isClient: boolean): Promise<Product> {
    const product = await this.productRepository.findById(id, isClient);

    if (!product) {
      throw new NotFoundError();
    }

    return product;
  }

  async create(product: ProductInsertDto): Promise<Product> {
    await validateDto(ProductInsertDto, product);

    const preparedProduct = {
      ...product,
      ingredients: product.ingredients ? JSON.stringify(product.ingredients) : null,
    };
    const created = await this.productRepository.create(preparedProduct);

    if (!created) {
      throw new AppError({
        internalMessage: 'Error al crear el producto'
      });
    }

    return created;
  }

  async update(id: string, product: ProductUpdateDto): Promise<Product> {
    await validateDto(ProductUpdateDto, product);

    const preparedProduct = {
      ...product,
      ingredients: product.ingredients ? JSON.stringify(product.ingredients) : null,
    };
    const updated = await this.productRepository.update(id, preparedProduct);

    if (!updated) {
      throw new NotFoundError({
        publicMessage: 'Producto no encontrado'
      });
    }

    return updated;
  }

  async delete(id: string): Promise<Product> {
    const deleted = await this.productRepository.delete(id);

    if (!deleted) {
      throw new NotFoundError({
        publicMessage: 'Producto no encontrado'
      });
    }

    return deleted;
  }

  async findCategoriesByProductId(id: string, isClient: boolean): Promise<Category[]> {
    return await this.productRepository.findCategoriesByProductId(id, isClient);
  }
}
