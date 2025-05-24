import { RequestHandler } from 'express-serve-static-core';
import { responseBuilder } from '../../../core/common/response-builder';
import { AdminOrderService } from '../services/admin-order.service';

export class AdminOrderController {
  constructor(
    private adminOrderService: AdminOrderService,
  ) { }

  getAll: RequestHandler = async (req, res, next) => {
    try {
      const data = await this.adminOrderService.findAll();

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
      const order_id = req.params.orderId;
      const data = await this.adminOrderService.findById(order_id);

      responseBuilder(res, {
        statusCode: 200,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  cancel: RequestHandler = async (req, res, next) => {
    try {
      const order_id = req.params.orderId;
      const data = await this.adminOrderService.cancelById(order_id);

      responseBuilder(res, {
        statusCode: 200,
        data,
      });
    } catch (error) {
      next(error);
    }
  }
}
