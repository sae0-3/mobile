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

export interface AvailableOrder {
  order_id: string;
  client_name: string;
  client_address: string;
  client_phone: string;
  total: number;
  created_at: string;
}

export interface OrderDetail {
  order_id: string;
  latitud: number;
  longitud: number;
  address: string;
  client_name: string;
  client_phone: string;
  product_name: string;
  quantity: number;
  subtotal: number;
}

export interface OrderDelivery {
  id: string,
  delivery_id: string;
}

