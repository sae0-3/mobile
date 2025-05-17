export type Product = {
  id: string;
  name: string;
  img_reference: string;
  price: number;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type CartState = {
  items: CartItem[];

  findItem: (productId: string) => CartItem | undefined;
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getSubtotal: (productId: string) => number;
  getTotal: () => number;
};
