import { validateDto } from '../../../core/common/validation';
import { NotFoundError } from '../../../core/errors/app.error';
import { DealerOrderDeliveryDto, DealerOrderDeliverySchema } from '../dtos/dealer-order.dto';
import { DealerOrderRepository } from '../repositories/dealer-order.repository';
import { AvailableOrder, Order, OrderDetail, OrderLocationInfo } from '../types/dealer-order.types';

export class DealerOrderService {
  constructor(
    private orderRepository: DealerOrderRepository
  ) { }

  async getAllAvailableOrders(): Promise<AvailableOrder[]> {
    return await this.orderRepository.getAllAvailableOrders();
  }

  async accepOrder(data: DealerOrderDeliveryDto): Promise<Order> {
    await validateDto(DealerOrderDeliverySchema, data);

    const updated = await this.orderRepository.accepOrder(data);

    if (!updated) {
      throw new NotFoundError({
        publicMessage: 'Pedido no encontrado o ya fue tomado',
      });
    }

    return updated;
  }

  async getOrderLocation(data: DealerOrderDeliveryDto): Promise<OrderLocationInfo> {
    await validateDto(DealerOrderDeliverySchema, data);

    const info = await this.orderRepository.getOrderLocationInfo(data);
    if (!info) {
      throw new NotFoundError({
        publicMessage: 'Información de ubicación del pedido no encontrada',
      });
    }
    return info;
  }

  async getOrderDetails(id: string): Promise<OrderDetail> {
    const details = await this.orderRepository.getOrderDetails(id);

    if (!details) {
      throw new NotFoundError({
        publicMessage: 'Detaller del pedido no entontrado',
      });
    }

    return details;
  }

  async markOrderAsDelivered(data: DealerOrderDeliveryDto): Promise<Order> {
    await validateDto(DealerOrderDeliverySchema, data);

    const updated = await this.orderRepository.markOrderAsDelivered(data);

    if (!updated) {
      throw new NotFoundError({
        publicMessage: 'Pedido no encontrado',
      })
    }

    return updated;
  }
}
