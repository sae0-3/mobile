export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message?: string;
  data: T;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  phoneNumber?: string;
}

export type RegisterResponse = ApiResponse<{
  id: string;
  access_token: string;
}>;

export interface RegisterDealerRequest {
  email: string;
  name: string;
  vehicle: 'car' | 'motorcycle' | 'bicycle';
  password: string;
}

export type RegisterDealerResponse = ApiResponse<{
  id: string;
  email: string;
  role: string;
  access_token: string;
}>;

export interface Dealer {
  id: string;
  email: string;
  name: string;
  vehicle: 'motorcycle' | 'bicycle' | 'car';
  created_at: string;
  updated_at: string;
}

export interface Client {
  id: string;
  email: string;
  name: string;
  phone: string | null;
  created_at: string;
  updated_at: string;
}

export type DealerRespose = ApiResponse<Dealer>;
export type DealersResponse = ApiResponse<Dealer[]>;

export type ClientResponse = ApiResponse<Client>;
export type ClientsResponse = ApiResponse<Client[]>;

export interface LoginRequest {
  email: string;
  password: string;
}

export type LoginResponse = ApiResponse<{
  access_token: string;
}>;

export interface ProductRequest {
  name: string;
  price: number;
  description?: string | null;
  img_reference?: string | null;
  ingredients?: string[] | null;
  available?: boolean;
  visible?: boolean;
  display_order?: number;
}

export interface Product {
  id: string;
  name: string;
  description: string | null;
  img_reference: string | null;
  price: number;
  available: boolean;
  ingredients: string[] | null;
  visible: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export type ProductResponse = ApiResponse<Product>;

export type ProductsResponse = ApiResponse<Product[]>;

export type Category = {
  id: string;
  name: string;
  visible: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export type CategoriesRequest = {
  name: string;
  visible: boolean;
  display_order: number;
}

export type CategoryResponse = ApiResponse<Category>;

export type CategoriesResponse = ApiResponse<Category[]>;

export interface TokenPayload {
  id: string;
  email: string;
  role: 'admin' | 'dealer' | 'client';
  iat: number;
  exp: number;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface TravelEstimate {
  distance: string;
  duration: string;
}

export interface Delivery {
  order_id: string;
  client_name: string;
  client_address: string;
  client_phone: string;
  totol: string;
  created_at: string;
}

export type DeliveryResponse = ApiResponse<Delivery[]>;

export interface UpdatedOrder {
  id: string;
  client_id: string;
  delivery_id: string;
  status: 'pending' | 'in_progress' | 'delivered' | 'cancelled';
  created_at: string;
  updated_at: string;
  total: string;
  user_address_id: string;
}

export interface OrderLocation {
  order_id: string;
  client_name: string;
  client_address: string;
  latitud: string;
  longitud: string;
  dealer_vehicle: 'car' | 'motorcycle' | 'bicycle';
}

export type OrderLocationResponse = ApiResponse<OrderLocation>;

export type UpdatedOrderResponse = ApiResponse<UpdatedOrder>;

export interface OrderDeliveryDetail {
  order_id: string;
  total: string;
  client_name: string;
  client_phone: string;
  products: {
    name: string;
    quantity: number;
    subtotal: string;
  }[];
}

export type OrderDeliveryDetailResponse = ApiResponse<OrderDeliveryDetail>;

export interface Location {
  id: string;
  user_id: string;
  address: string;
  latitud: string | null;
  longitud: string | null;
  created_at: string;
}

export interface LocationRequest {
  address: string;
  latitud: number;
  longitud: number;
}

export type LocationResponse = ApiResponse<Location>;
export type LocationsResponse = ApiResponse<Location[]>;

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

export interface OrderItem {
  id: string;
  quantity: number;
  subtotal: number;
  product: Product;
}

export interface OrderWithItems extends Order {
  items: OrderItem[];
}

export interface OrderDetailsInsert {
  product_id: string;
  quantity: number;
  subtotal: number;
}

export interface OrderRequest {
  total: number;
  user_address_id: string;
  items: OrderDetailsInsert[];
}

export type OrderResponse = ApiResponse<Order>;
export type OrderWithItemsResponse = ApiResponse<OrderWithItems[]>;
export type OrderWithItemResponse = ApiResponse<OrderWithItems>; 