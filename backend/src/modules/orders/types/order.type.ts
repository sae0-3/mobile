import { Product } from '../../catalog/types/product.type';
import { Location } from '../../locations/types/location.type';
import { Client } from '../../users/types/client.type';
import { Dealer } from '../../users/types/dealer.type';

export interface Order {
  id: string;
  client_id: string;
  user_address_id: string;
  delivery_id: string | null;
  status: 'pending' | 'in_progress' | 'delivered' | 'cancelled';
  created_at: string;
  updated_at: string;
  total: number;
}

export interface OrderDetails {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  subtotal: number;
}

export interface OrderInsert {
  client_id: string;
  user_address_id: string;
  total: number;
}

export interface OrderDetailsInsert {
  order_id: string;
  product_id: string;
  quantity: number;
  subtotal: number;
}

export type OrderDetailsWithProduct = Omit<OrderDetails, 'order_id' | 'product_id'> & {
  product: Omit<Product, 'available' | 'visible' | 'display_order' | 'created_at' | 'updated_at'> | null;
};

export type OrderWithDetails = Omit<Order, 'client_id' | 'user_address_id' | 'delivery_id'> & {
  items: OrderDetailsWithProduct[];
  client: Omit<Client, 'created_at' | 'updated_at'>;
  location: Omit<Location, 'id' | 'user_id' | 'created_at'>;
  dealer: Omit<Dealer, 'created_at' | 'updated_at'> | null;
};

export type OrderHistory = Pick<OrderWithDetails, 'location'> & {
  items: number;
};
