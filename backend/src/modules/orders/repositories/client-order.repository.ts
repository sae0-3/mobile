import { BaseRepository } from '../../../core/common/base.repository';
import { Order, OrderInsert } from '../types/order.type';

export class ClientOrderRepository extends BaseRepository {
  async findAll(client_id: string): Promise<Order[]> {
    const sql = `
      SELECT * FROM orders
      WHERE client_id = $1
      ORDER BY created_at DESC
    `;

    return await this.query<Order>(sql, [client_id]);
  }

  async findById(order_id: string, client_id: string): Promise<Order | null> {
    const sql = `
      SELECT * FROM orders
      WHERE id = $1 AND client_id = $2
    `;

    return await this.queryOne<Order>(sql, [order_id, client_id]);
  }

  async create(order: OrderInsert): Promise<Order | null> {
    return await this.insert<Order>('orders', order);
  }

  async cancelById(order_id: string): Promise<Order | null> {
    return await this.updateById<Order>('orders', order_id, {
      status: 'cancelled',
    });
  }
}
