export interface Category {
  id: string;
  name: string;
  visible: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface CategoryInsert {
  name: string;
  visible?: boolean;
  display_order?: number;
}

export type CategoryUpdate = Partial<Omit<Category, 'id' | 'created_at' | 'updated_at'>>;
