import { RequestHandler } from 'express';
import { responseBuilder } from '../../../core/common/response-builder';
import { CategoryService } from '../services/category.service';

export class CategoryController {
  constructor(
    private categoryService: CategoryService,
  ) { }

  getAll: RequestHandler = async (req, res, next) => {
    try {
      const isClient = req.user?.role === 'client';
      const data = await this.categoryService.findAll(isClient);

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
      const data = await this.categoryService.findById(id, isClient);

      responseBuilder(res, {
        statusCode: 200,
        data
      });
    } catch (error) {
      next(error);
    }
  }

  getProductCategories: RequestHandler = async (req, res, next) => {
    try {
      const isClient = req.user?.role === 'client';
      const id = req.params.id;
      const data = await this.categoryService.findProductsByCategoryId(id, isClient);

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
      const category = req.body;
      const data = await this.categoryService.create(category);

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
      const category = req.body;
      const data = await this.categoryService.update(id, category);

      responseBuilder(res, {
        statusCode: 201,
        data
      });
    } catch (error) {
      next(error);
    }
  }

  deleteById: RequestHandler = async (req, res, next) => {
    try {
      const id = req.params.id;
      await this.categoryService.delete(id);

      responseBuilder(res, { statusCode: 204 });
    } catch (error) {
      next(error);
    }
  }
}
