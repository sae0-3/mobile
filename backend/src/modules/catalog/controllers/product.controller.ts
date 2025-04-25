import { RequestHandler } from 'express';
import { responseBuilder } from '../../../core/common/response-builder';
import { ProductService } from '../services/product.service';

export class ProductController {
  constructor(
    private productService: ProductService,
  ) { }

  getAll: RequestHandler = async (req, res, next) => {
    try {
      const isClient = req.user?.role === 'client';
      const data = await this.productService.findAll(isClient);

      responseBuilder(res, {
        statusCode: 200,
        data
      });
    } catch (error) {
      next(error);
    }
  }

  getById: RequestHandler = async (req, res, next) => {
    try {
      const isClient = req.user?.role === 'client';
      const id = req.params.id;
      const data = await this.productService.findById(id, isClient);

      responseBuilder(res, {
        statusCode: 200,
        data
      });
    } catch (error) {
      next(error);
    }
  }

  getCategoriesById: RequestHandler = async (req, res, next) => {
    try {
      const isClient = req.user?.role === 'client';
      const id = req.params.id;
      const data = await this.productService.findCategoriesByProductId(id, isClient);

      responseBuilder(res, {
        statusCode: 200,
        data
      });
    } catch (error) {
      next(error);
    }
  }

  insert: RequestHandler = async (req, res, next) => {
    try {
      const product = req.body;
      const data = await this.productService.create(product);

      responseBuilder(res, {
        statusCode: 201,
        data
      });
    } catch (error) {
      next(error);
    }
  }

  updateById: RequestHandler = async (req, res, next) => {
    try {
      const id = req.params.id;
      const product = req.body;
      const data = await this.productService.update(id, product);

      responseBuilder(res, {
        statusCode: 200,
        data
      });
    } catch (error) {
      next(error);
    }
  }

  deleteById: RequestHandler = async (req, res, next) => {
    try {
      const id = req.params.id;
      await this.productService.delete(id);

      responseBuilder(res, { statusCode: 204 });
    } catch (error) {
      next(error);
    }
  }
}
