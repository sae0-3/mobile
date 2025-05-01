import { RequestHandler } from 'express';
import { responseBuilder } from '../../../core/common/response-builder';
import { ClientService } from '../services/client.service';

export class ClientController {
  constructor(
    private clientService: ClientService,
  ) { }

  getAll: RequestHandler = async (req, res, next) => {
    try {
      const data = await this.clientService.findAll();

      responseBuilder(res, { statusCode: 200, data });
    } catch (error) {
      next(error);
    }
  }

  getById: RequestHandler = async (req, res, next) => {
    try {
      const id = req.params.id;
      const data = await this.clientService.findById(id);

      responseBuilder(res, { statusCode: 200, data });
    } catch (error) {
      next(error);
    }
  }

  insert: RequestHandler = async (req, res, next) => {
    try {
      const dealer = req.body;
      const data = await this.clientService.create(dealer);

      responseBuilder(res, { statusCode: 201, data });
    } catch (error) {
      next(error);
    }
  }

  updateById: RequestHandler = async (req, res, next) => {
    try {
      const id = req.params.id;
      const dealer = req.body;
      const data = await this.clientService.update(id, dealer);

      responseBuilder(res, { statusCode: 200, data });
    } catch (error) {
      next(error);
    }
  }

  deleteById: RequestHandler = async (req, res, next) => {
    try {
      const id = req.params.id;
      await this.clientService.delete(id);

      responseBuilder(res, { statusCode: 204 });
    } catch (error) {
      next(error);
    }
  }
}
