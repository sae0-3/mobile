import { BaseRepository } from '../../../core/common/base.repository';
import { OrderDetails, OrderDetailsInsert } from '../types/order.type';

export class OrderDetailsRepository extends BaseRepository {
  async findAll(order_id: string): Promise<OrderDetails[]> {
    const sql = `
      SELECT * FROM order_details
      WHERE order_id = $1
    `;

    return await this.query<OrderDetails>(sql, [order_id]);
  }

  async createMany(items: OrderDetailsInsert[]): Promise<OrderDetails[]> {
    if (items.length === 0) return [];

    const values: unknown[] = [];
    const valuePlaceholders = items.map((item, i) => {
      const baseIndex = i * 4;
      values.push(item.order_id, item.product_id, item.quantity, item.subtotal);
      return `($${baseIndex + 1}, $${baseIndex + 2}, $${baseIndex + 3}, $${baseIndex + 4})`;
    });

    const sql = `
      INSERT INTO order_details (order_id, product_id, quantity, subtotal)
      VALUES ${valuePlaceholders.join(', ')}
      RETURNING *
    `;

    return await this.query<OrderDetails>(sql, values);
  }
}
