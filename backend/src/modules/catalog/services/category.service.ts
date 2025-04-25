import { validateDto } from '../../../core/common/validation';
import { AppError, NotFoundError } from '../../../core/errors/app.error';
import { CategoryInsertDto, CategoryUpdateDto } from '../dtos/category.dto';
import { CategoryRepository } from '../repositories/category.repository';
import { Category } from '../types/category.type';
import { Product } from '../types/product.type';

export class CategoryService {
  constructor(
    private categoryRepository: CategoryRepository,
  ) { }

  async findAll(isClient: boolean): Promise<Category[]> {
    return await this.categoryRepository.findAll(isClient);
  }

  async findById(id: string, isClient: boolean): Promise<Category> {
    const category = await this.categoryRepository.findById(id, isClient);

    if (!category) {
      throw new NotFoundError({
        publicMessage: 'Categoría no encontrada'
      });
    }

    return category;
  }

  async create(category: CategoryInsertDto): Promise<Category> {
    await validateDto(CategoryInsertDto, category);

    const created = await this.categoryRepository.create(category);

    if (!created) {
      throw new AppError({
        internalMessage: 'Error al crear la categoría'
      });
    }

    return created;
  }

  async update(id: string, category: CategoryUpdateDto): Promise<Category> {
    await validateDto(CategoryUpdateDto, category);

    const updated = await this.categoryRepository.update(id, category);

    if (!updated) {
      throw new NotFoundError({
        publicMessage: 'Categoría no encontrada'
      });
    }

    return updated;
  }

  async delete(id: string): Promise<Category | null> {
    const deleted = await this.categoryRepository.delete(id);

    if (!deleted) {
      throw new NotFoundError({
        publicMessage: 'Categoría no encontrada'
      });
    }

    return deleted;
  }

  async findProductsByCategoryId(id: string, isClient: boolean): Promise<Product[]> {
    return await this.categoryRepository.findProductsByCategoryId(id, isClient);
  }
}
