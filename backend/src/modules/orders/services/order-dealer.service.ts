import { validateDto } from '../../../core/common/validation';
import { NotFoundError } from '../../../core/errors/app.error';
import { OrderDeliveryDto } from '../dtos/order-dealer.dto';
import { OrderRepository } from '../repositories/order-dealer.repository';
import { AvailableOrder, Order, OrderDetail, OrderLocationInfo } from '../types/order-dealer.types';

export class OrderService {
  constructor(
    private orderRepository: OrderRepository
  ) { }

  async getAllAvailableOrders(): Promise<AvailableOrder[]> {
    return await this.orderRepository.getAllAvailableOrders();
  }

  async accepOrder(data: OrderDeliveryDto): Promise<Order> {
    await validateDto(OrderDeliveryDto, data);

    const updated = await this.orderRepository.accepOrder(data);

    if (!updated) {
      throw new NotFoundError({
        publicMessage: 'Pedido no encontrado o ya fue tomado',
      });
    }

    return updated;
  }

  async getOrderLocation(data: OrderDeliveryDto): Promise<OrderLocationInfo> {
    await validateDto(OrderDeliveryDto, data);
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

  async markOrderAsDelivered(data: OrderDeliveryDto): Promise<Order> {
    await validateDto(OrderDeliveryDto, data);

    const updated = await this.orderRepository.markOrderAsDelivered(data);

    if (!updated) {
      throw new NotFoundError({
        publicMessage: 'Pedido no encontrado',
      })
    }

    return updated;
  }
}