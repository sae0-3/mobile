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

export type DealerRespose = ApiResponse<Dealer>;

export type DealersResponse = ApiResponse<Dealer[]>;

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

export interface OrderBase {
  id: string;
  clientName: string;
  address: string;
  items: string[];
  phone: number;
};

export type Order = OrderBase & Coordinates
