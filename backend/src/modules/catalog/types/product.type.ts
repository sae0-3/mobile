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

export type ProductInsert = {
  name: string;
  price: number;
  description?: string | null;
  img_reference?: string | null;
  ingredients?: string | null;
  available?: boolean;
  visible?: boolean;
  display_order?: number;
}

export type ProductUpdate = Partial<Omit<Product, 'id' | 'created_at' | 'updated_at'>>;
