import { RequestHandler } from 'express';
import { responseBuilder } from '../../../core/common/response-builder';
import { DealerService } from '../services/dealer.service';

export class DealerController {
  constructor(
    private dealerService: DealerService,
  ) { }

  getAll: RequestHandler = async (req, res, next) => {
    try {
      const data = await this.dealerService.findAll();

      responseBuilder(res, { statusCode: 200, data });
    } catch (error) {
      next(error);
    }
  }

  getById: RequestHandler = async (req, res, next) => {
    try {
      const id = req.params.id;
      const data = await this.dealerService.findById(id);

      responseBuilder(res, { statusCode: 200, data });
    } catch (error) {
      next(error);
    }
  }

  insert: RequestHandler = async (req, res, next) => {
    try {
      const dealer = req.body;
      const data = await this.dealerService.create(dealer);

      responseBuilder(res, { statusCode: 201, data });
    } catch (error) {
      next(error);
    }
  }

  updateById: RequestHandler = async (req, res, next) => {
    try {
      const id = req.params.id;
      const dealer = req.body;
      const data = await this.dealerService.update(id, dealer);

      responseBuilder(res, { statusCode: 200, data });
    } catch (error) {
      next(error);
    }
  }

  deleteById: RequestHandler = async (req, res, next) => {
    try {
      const id = req.params.id;
      await this.dealerService.delete(id);

      responseBuilder(res, { statusCode: 204 });
    } catch (error) {
      next(error);
    }
  }
}
