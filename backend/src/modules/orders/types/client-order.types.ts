import { Product } from '../../catalog/types/product.type';
import { Order, OrderDetails } from './order.type';

export type OrderDetailsWithProduct = Omit<OrderDetails, 'order_id' | 'product_id'> & {
  product: Omit<Product, 'available' | 'visible' | 'display_order' | 'created_at' | 'updated_at'> | null;
};

export type OrderWithDetails = Omit<Order, 'client_id' | 'user_address_id'> & {
  items: OrderDetailsWithProduct[];
};
