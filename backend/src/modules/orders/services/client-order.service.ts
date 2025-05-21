import { validateDto } from '../../../core/common/validation';
import { AppError, NotFoundError } from '../../../core/errors/app.error';
import { ClientOrderInsertDto, ClientOrderInsertSchema } from '../dtos/client-order.dto';
import { ClientOrderRepository } from '../repositories/client-order.repository';
import { OrderWithDetails } from '../types/client-order.types';
import { Order } from '../types/order.type';
import { OrderDetailsService } from './order-details.service';

export class ClientOrderService {
  constructor(
    private clientOrderRepository: ClientOrderRepository,
    private orderDetailsService: OrderDetailsService,
  ) { }

  async findAll(client_id: string): Promise<OrderWithDetails[]> {
    if (!client_id) {
      throw new NotFoundError({
        publicMessage: 'No se encontró el usuario',
      });
    }

    const orders = await this.clientOrderRepository.findAll(client_id);

    const ordersWithDetails = await Promise.all(
      orders.map(async ({ id, delivery_id, created_at, updated_at, total, status }) => {
        const items = await this.orderDetailsService.getDetailsWithProduct(id);
        return { id, delivery_id, created_at, updated_at, total, status, items };
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

    return {
      id: order.id,
      delivery_id: order.delivery_id,
      created_at: order.created_at,
      updated_at: order.updated_at,
      total: order.total,
      status: order.status,
      items: itemsWithProducts,
    };
  }

  async create(client_id: string, order: ClientOrderInsertDto): Promise<Order | null> {
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
