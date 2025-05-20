import { RequestHandler } from 'express';
import { responseBuilder } from '../../../core/common/response-builder';
import { ClientOrderService } from '../services/client-order.service';

export class ClientOrderController {
  constructor(
    private clientOrderService: ClientOrderService,
  ) { }

  getAll: RequestHandler = async (req, res, next) => {
    try {
      const client_id = req.user?.id || '';
      const data = await this.clientOrderService.findAll(client_id);

      responseBuilder(res, {
        statusCode: 200,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  getById: RequestHandler = async (req, res, next) => {
    try {
      const client_id = req.user?.id || '';
      const order_id = req.params.orderId;
      const data = await this.clientOrderService.findById(order_id, client_id);

      responseBuilder(res, {
        statusCode: 200,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  create: RequestHandler = async (req, res, next) => {
    try {
      const client_id = req.user?.id || '';
      const order = req.body;
      const data = await this.clientOrderService.create(client_id, order);

      responseBuilder(res, {
        statusCode: 200,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  cancelById: RequestHandler = async (req, res, next) => {
    try {
      const client_id = req.user?.id || '';
      const order_id = req.params.orderId;
      const data = await this.clientOrderService.cancelById(order_id, client_id);

      responseBuilder(res, {
        statusCode: 200,
        data,
      });
    } catch (error) {
      next(error);
    }
  }
}
