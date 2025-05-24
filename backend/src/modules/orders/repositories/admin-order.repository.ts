import { BaseRepository } from '../../../core/common/base.repository';
import { Order } from '../types/order.type';

export class AdminOrderRepository extends BaseRepository {
  async findAll(): Promise<Order[]> {
    const sql = `
      SELECT * FROM orders
      ORDER BY created_at DESC
    `;

    return await this.query<Order>(sql, []);
  }

  async findById(id: string): Promise<Order | null> {
    const sql = `
      SELECT * FROM orders
      WHERE id = $1
    `;

    return await this.queryOne<Order>(sql, [id]);
  }

  async cancelById(id: string): Promise<Order | null> {
    return await this.updateById<Order>('orders', id, {
      status: 'cancelled',
      updated_at: 'now()',
    });
  }
}
