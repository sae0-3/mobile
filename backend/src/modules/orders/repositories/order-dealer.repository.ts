import { BaseRepository } from '../../../core/common/base.repository';
import { Order, AvailableOrder, OrderDetail, OrderDelivery, OrderDetailRow, OrderLocationInfo } from '../types/order-dealer.types';

export class OrderRepository extends BaseRepository {
  async getAllAvailableOrders(): Promise<AvailableOrder[]> {
    const sql = `
      SELECT
        o.id AS order_id,
        c.name AS client_name,
        ua.address AS client_address,
        c.phone AS client_phone,
        o.total,
        o.created_at
      FROM orders o
      JOIN clients c ON o.client_id = c.user_id
      JOIN user_address ua ON o.user_address_id = ua.id
      WHERE o.status = 'pending' AND o.delivery_id IS NULL
    `;
    return await this.query<AvailableOrder>(sql);
  }

  async accepOrder(order_delivery: OrderDelivery): Promise<Order | null> {
    const sql = `
      UPDATE orders
      SET delivery_id = $1,
        status = 'in_progress',
        updated_at = now()
      WHERE id = $2 AND delivery_id IS NULL AND status = 'pending'
      RETURNING *
    `;
    return await this.queryOne<Order>(sql, [order_delivery.delivery_id, order_delivery.id]);
  }

  async getOrderLocationInfo(order_delivery: OrderDelivery): Promise<OrderLocationInfo | null> {
    const sql = `
    SELECT
      o.id AS order_id,
      c.name AS client_name,
      ua.address AS client_address,
      ua.latitud,
      ua.longitud,
      d.vehicle AS dealer_vehicle
    FROM orders o
    JOIN clients c ON o.client_id = c.user_id
    JOIN user_address ua ON o.user_address_id = ua.id
    LEFT JOIN dealers d ON o.delivery_id = d.user_id
    WHERE o.id = $1 AND o.delivery_id = $2
  `;
    return await this.queryOne<OrderLocationInfo>(sql, [order_delivery.id, order_delivery.delivery_id]);
  }


  async getOrderDetails(id: string): Promise<OrderDetail | null> {
    const sql = `
      SELECT
        o.id AS order_id,
        o.total,
        c.name AS client_name,
        c.phone AS client_phone,
        p.name AS product_name,
        od.quantity,
        od.subtotal
      FROM orders o
      JOIN clients c ON o.client_id = c.user_id
      JOIN order_details od ON od.order_id = o.id
      JOIN products p ON p.id = od.product_id
      WHERE o.id = $1
    `;
    const rows = await this.query<OrderDetailRow>(sql, [id]);

    if (!rows.length) return null;

    const { order_id, total, client_name, client_phone } = rows[0];
    const products = rows.map(row => ({
      name: row.product_name,
      quantity: row.quantity,
      subtotal: row.subtotal,
    }));
    return {
      order_id,
      total,
      client_name,
      client_phone,
      products,
    }
  }

  async markOrderAsDelivered(order_delivery: OrderDelivery): Promise<Order | null> {
    const sql = `
      UPDATE orders
      SET status = 'delivered',
        updated_at = now()
      WHERE id = $1 AND delivery_id = $2 AND status = 'in_progress'
      RETURNING *
    `;
    return await this.queryOne<Order>(sql, [order_delivery.id, order_delivery.delivery_id]);
  }
}