import { RequestHandler } from 'express';
import { ProductCategoryService } from '../services/product-category.service';
import { responseBuilder } from '../../../core/common/response-builder';

export class ProductCategoryController {
  constructor(
    private productCategoryService: ProductCategoryService,
  ) { }

  add: RequestHandler = async (req, res, next) => {
    try {
      const product_id = req.params.productId;
      const category_id = req.params.categoryId;

      await this.productCategoryService.linkProductToCategory({ product_id, category_id });

      responseBuilder(res, { statusCode: 201 });
    } catch (error) {
      next(error);
    }
  }

  remove: RequestHandler = async (req, res, next) => {
    try {
      const product_id = req.params.productId;
      const category_id = req.params.categoryId;

      await this.productCategoryService.unlinkProductFromCategory({ product_id, category_id });

      responseBuilder(res, { statusCode: 204 });
    } catch (error) {
      next(error);
    }
  }
}
