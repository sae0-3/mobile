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

export interface Category {
  id: string;
  name: string;
  visible: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}
