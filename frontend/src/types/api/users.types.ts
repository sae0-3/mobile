export interface User {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface Client extends User {
  name: string;
  phone: string | null;
}

export interface Dealer extends User {
  name: string;
  vehicle: 'motorcycle' | 'bicycle' | 'car';
}

export interface Admin extends User { }
