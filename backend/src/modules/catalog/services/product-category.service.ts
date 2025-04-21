import { validateDto } from '../../../core/common/validation';
import { AppError } from '../../../core/errors/app.error';
import { ProductCategoryDto } from '../dtos/product-category.dto';
import { ProductCategoryRepository } from '../repositories/product-category.repository';
import { ProductCategory } from '../types/product-category.type';

export class ProductCategoryService {
  constructor(
    private productCategoryRepository: ProductCategoryRepository,
  ) { }

  async linkProductToCategory(data: ProductCategoryDto): Promise<ProductCategory> {
    await validateDto(ProductCategoryDto, data);

    const link = await this.productCategoryRepository.linkProductToCategory(data);

    if (!link) {
      throw new AppError({
        internalMessage: 'No se logro enlazar el producto con la categoría'
      });
    }

    return link;
  }


  async unlinkProductFromCategory(data: ProductCategoryDto): Promise<ProductCategory> {
    await validateDto(ProductCategoryDto, data);

    const link = await this.productCategoryRepository.unlinkProductFromCategory(data);

    if (!link) {
      throw new AppError({
        internalMessage: 'No se logro eliminar el enlace del producto con la categoría'
      });
    }

    return link;
  }
}
