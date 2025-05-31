import { validateDto } from '../../../core/common/validation';
import { NotFoundError } from '../../../core/errors/app.error';
import { LocationService } from '../../locations/services/location.service';
import { ClientService } from '../../users/services/client.service';
import { DealerOrderDeliveryDto, DealerOrderDeliverySchema } from '../dtos/dealer-order.dto';
import { DealerOrderRepository } from '../repositories/dealer-order.repository';
import { AvailableOrder, Order, OrderDetail, OrderLocationInfo, OrderWithDetails } from '../types/dealer-order.types';
import { OrderHistory } from '../types/order.type';
import { OrderDetailsService } from './order-details.service';

export class DealerOrderService {
  constructor(
    private orderRepository: DealerOrderRepository,
    private orderDetailsService: OrderDetailsService,
    private clientService: ClientService,
    private LocationService: LocationService,
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

  async getHistory(dealer_id: string): Promise<OrderHistory[]> {
    if (!dealer_id) {
      throw new NotFoundError({
        publicMessage: 'Repartidor no encontrado',
      });
    }

    const orders = await this.orderRepository.findAll(dealer_id);

    const ordersWithDetails = await Promise.all(
      orders.map(async (order) => {
        const items = await this.orderDetailsService.getDetailsByOrderId(order.id);
        const locationClient = await this.LocationService.findById(order.user_address_id, order.client_id);

        return {
          id: order.id,
          total: order.total,
          status: order.status,
          created_at: order.created_at,
          updated_at: order.updated_at,
          location: {
            address: locationClient.address,
            latitud: locationClient.latitud,
            longitud: locationClient.longitud,
          },
          items: items.length,
        };
      })
    );

    return ordersWithDetails;
  }

  async getOrderFromHistoryById(order_id: string, dealer_id: string): Promise<OrderWithDetails> {
    if (!dealer_id) {
      throw new NotFoundError({
        publicMessage: 'Repartidor no encontrado',
      });
    }

    const order = await this.orderRepository.findById(order_id, dealer_id);
    if (!order) {
      throw new NotFoundError({
        publicMessage: 'Pedido no encontrado',
      });
    }

    const client = await this.clientService.findById(order.client_id);
    if (!client) {
      throw new NotFoundError({
        publicMessage: 'Cliente no encontrado',
      });
    }

    const location = await this.LocationService.findById(order.user_address_id, order.client_id);
    if (!location) {
      throw new NotFoundError({
        publicMessage: 'Ubicación no encontrada',
      });
    }

    const details = await this.orderDetailsService.getDetailsWithProduct(order.id);

    const result = {
      id: order.id,
      total: order.total,
      status: order.status,
      created_at: order.created_at,
      updated_at: order.updated_at,
      client: {
        id: client.id,
        name: client.name,
        email: client.email,
        phone: client.phone,
      },
      location: {
        address: location.address,
        latitud: location.latitud,
        longitud: location.longitud,
      },
      items: details,
    };

    return result;
  }
}
