import { RequestHandler } from 'express';
import { responseBuilder } from '../../../core/common/response-builder';
import { OrderService } from '../services/order-dealer.service';

export class OrderController {
  constructor(
    private orderService: OrderService
  ) { }

  getAllAvailableOrders: RequestHandler = async (req, res, next) => {
    try {
      const data = await this.orderService.getAllAvailableOrders();

      responseBuilder(res, {
        statusCode: 200,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  accepOrder: RequestHandler = async (req, res, next) => {
    try {
      const delivery_id = req.user?.id || '';
      const id = req.params.orderId;

      const data = await this.orderService.accepOrder({ id, delivery_id })
      responseBuilder(res, {
        statusCode: 200,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  getOrderLocationInfo: RequestHandler = async (req, res, next) => {
    try {
      const delivery_id = req.user?.id || '';
      const id = req.params.orderId;
      const data = await this.orderService.getOrderLocation({ id, delivery_id });

      responseBuilder(res, {
        statusCode: 200,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  getOrderDetails: RequestHandler = async (req, res, next) => {
    try {
      const id = req.params.orderId;
      const data = await this.orderService.getOrderDetails(id);

      responseBuilder(res, {
        statusCode: 200,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  markOrderAsDelivered: RequestHandler = async (req, res, next) => {
    try {
      const delivery_id = req.user?.id || '';
      const id = req.params.orderId;
      const data = await this.orderService.markOrderAsDelivered({ id, delivery_id });

      responseBuilder(res, {
        statusCode: 200,
        data,
      });
    } catch (error) {
      next(error);
    }
  }
}