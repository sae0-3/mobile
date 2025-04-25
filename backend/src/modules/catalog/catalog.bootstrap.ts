import { CategoryController } from './controllers/category.controller';
import { ProductCategoryController } from './controllers/product-category.controller';
import { ProductController } from './controllers/product.controller';
import { CategoryRepository } from './repositories/category.repository';
import { ProductCategoryRepository } from './repositories/product-category.repository';
import { ProductRepository } from './repositories/product.repository';
import { CategoryService } from './services/category.service';
import { ProductCategoryService } from './services/product-category.service';
import { ProductService } from './services/product.service';

export function createCatalogController() {
  const categoryRepository = new CategoryRepository();
  const productRepository = new ProductRepository();
  const productCategoryRepository = new ProductCategoryRepository();

  const categoryService = new CategoryService(categoryRepository);
  const productService = new ProductService(productRepository);
  const productCategoryService = new ProductCategoryService(productCategoryRepository);

  const controller = {
    categoryController: new CategoryController(categoryService),
    productController: new ProductController(productService),
    productCategoryController: new ProductCategoryController(productCategoryService)
  };

  return controller;
}
