import { validateDto } from '../../../core/common/validation';
import { AppError, NotFoundError } from '../../../core/errors/app.error';
import { LocationService } from '../../locations/services/location.service';
import { ClientOrderInsertDto, ClientOrderInsertSchema } from '../dtos/client-order.dto';
import { ClientOrderRepository } from '../repositories/client-order.repository';
import { OrderWithDetails } from '../types/client-order.types';
import { Order, OrderHistory } from '../types/order.type';
import { OrderDetailsService } from './order-details.service';

export class ClientOrderService {
  constructor(
    private clientOrderRepository: ClientOrderRepository,
    private orderDetailsService: OrderDetailsService,
    private locationService: LocationService,
  ) { }

  async findAll(client_id: string): Promise<OrderHistory[]> {
    if (!client_id) {
      throw new NotFoundError({
        publicMessage: 'No se encontró el usuario',
      });
    }

    const orders = await this.clientOrderRepository.findAll(client_id);

    const ordersWithDetails = await Promise.all(
      orders.map(async ({ id, created_at, updated_at, total, status, user_address_id, client_id }) => {
        const items = await this.orderDetailsService.getDetailsByOrderId(id);
        const location = await this.locationService.findById(user_address_id, client_id);

        return {
          id,
          created_at,
          updated_at,
          total,
          status,
          location: {
            address: location.address,
            latitud: location.latitud,
            longitud: location.longitud,
          },
          items: items.length,
        };
      })
    );

    return ordersWithDetails;
  }

  async findById(order_id: string, client_id: string): Promise<OrderWithDetails> {
    if (!client_id) {
      throw new NotFoundError({
        publicMessage: 'No se encontró el usuario',
      });
    }

    if (!order_id) {
      throw new NotFoundError({
        publicMessage: 'No se encontró el pedido',
      });
    }

    const order = await this.clientOrderRepository.findById(order_id, client_id);
    if (!order) {
      throw new NotFoundError({
        publicMessage: 'No se encontró información del pedido',
      });
    }

    const itemsWithProducts = await this.orderDetailsService.getDetailsWithProduct(order_id);
    const location = await this.locationService.findById(order.user_address_id, client_id);

    return {
      id: order.id,
      created_at: order.created_at,
      updated_at: order.updated_at,
      total: order.total,
      status: order.status,
      location: {
        address: location.address,
        latitud: location.latitud,
        longitud: location.longitud,
      },
      items: itemsWithProducts,
    };
  }

  async create(client_id: string, order: ClientOrderInsertDto): Promise<Order> {
    if (!client_id) {
      throw new NotFoundError({
        publicMessage: 'No se encontró el usuario',
      });
    }

    await validateDto(ClientOrderInsertSchema, order);

    const created = await this.clientOrderRepository.create({
      total: order.total,
      user_address_id: order.user_address_id,
      client_id,
    });

    if (!created) {
      throw new AppError({
        publicMessage: 'No se logro crear el pedido',
      });
    }

    try {
      await this.orderDetailsService.createMany(created.id, order.items);
    } catch (error) {
      await this.cancelById(created.id, client_id);
      throw new AppError({
        publicMessage: 'No se logro registrar los productos del pedido'
      });
    }

    return created;
  }

  async cancelById(order_id: string, client_id: string): Promise<Order> {
    if (!client_id) {
      throw new NotFoundError({
        publicMessage: 'No se encontró el usuario',
      });
    }

    if (!order_id) {
      throw new NotFoundError({
        publicMessage: 'No se encontró el pedido',
      });
    }

    const cancelled = await this.clientOrderRepository.cancelById(order_id);
    if (!cancelled) {
      throw new AppError({
        publicMessage: 'No se logro cancelar el pedido'
      });
    }

    return cancelled;
  }
}
