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
