import { AppError, NotFoundError } from '../../../core/errors/app.error';
import { LocationService } from '../../locations/services/location.service';
import { ClientService } from '../../users/services/client.service';
import { DealerService } from '../../users/services/dealer.service';
import { AdminOrderRepository } from '../repositories/admin-order.repository';
import { Order, OrderHistory, OrderWithDetails } from '../types/order.type';
import { OrderDetailsService } from './order-details.service';

export class AdminOrderService {
  constructor(
    private adminOrderRepository: AdminOrderRepository,
    private orderDetailsService: OrderDetailsService,
    private clientService: ClientService,
    private dealerService: DealerService,
    private locationService: LocationService,
  ) { }

  async findAll(): Promise<OrderHistory[]> {
    const orders = await this.adminOrderRepository.findAll();

    const ordersWithQuantity: OrderHistory[] = await Promise.all(
      orders.map(async (order) => {
        const items = await this.orderDetailsService.getDetailsByOrderId(order.id);
        const location = await this.locationService.findById(order.user_address_id, order.client_id);

        return {
          id: order.id,
          status: order.status,
          total: order.total,
          items: items.length,
          created_at: order.created_at,
          updated_at: order.updated_at,
          location: {
            address: location.address,
            latitud: location.latitud,
            longitud: location.longitud,
          },
        };
      })
    );

    return ordersWithQuantity;
  }

  async findById(id: string): Promise<OrderWithDetails> {
    const order = await this.adminOrderRepository.findById(id);
    if (!order) {
      throw new NotFoundError({
        publicMessage: 'Pedido no encontrado',
      });
    }

    const details = await this.orderDetailsService.getDetailsWithProduct(id);
    const client = await this.clientService.findById(order.client_id);
    const location = await this.locationService.findById(order.user_address_id, order.client_id);

    let dealer;
    if (order.delivery_id) {
      const dealerData = await this.dealerService.findById(String(order.delivery_id));

      dealer = {
        id: dealerData.id,
        name: dealerData.name,
        email: dealerData.email,
        vehicle: dealerData.vehicle,
      };
    } else {
      dealer = null;
    }

    const orderWithDetails: OrderWithDetails = {
      id: order.id,
      status: order.status,
      total: order.total,
      created_at: order.created_at,
      updated_at: order.updated_at,
      client: {
        id: client.id,
        name: client.name,
        email: client.email,
        phone: client.phone,
      },
      dealer,
      location: {
        address: location.address,
        latitud: location.latitud,
        longitud: location.longitud,
      },
      items: details,
    };

    return orderWithDetails;
  }

  async cancelById(id: string): Promise<Order> {
    const order = await this.adminOrderRepository.findById(id);
    if (!order) {
      throw new NotFoundError({
        publicMessage: 'Pedido no encontrado',
      });
    }

    const canceled = await this.adminOrderRepository.cancelById(id);
    if (!canceled) {
      throw new AppError({
        publicMessage: 'No se logro cancelar el pedido',
      });
    }

    return canceled;
  }
}
