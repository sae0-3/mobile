import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, CartState } from '../types/orderTypes';

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => {
      const findItem = (productId: string) =>
        get().items.find(item => item.product.id === productId);

      const updateItems = (updater: (items: CartItem[]) => CartItem[]) =>
        set(state => ({ items: updater(state.items) }));

      return {
        items: [],

        addItem: (item, quantity = 1) => {
          if (quantity <= 0) return;

          updateItems(items => {
            const existingItem = items.find(i => i.product.id === item.product.id);

            if (existingItem) {
              return items.map(i =>
                i.product.id === item.product.id
                  ? { ...i, quantity: i.quantity + quantity }
                  : i
              );
            }

            return [...items, { product: item.product, quantity }];
          });
        },

        removeItem: (productId) => {
          updateItems(items => items.filter(i => i.product.id !== productId));
        },

        updateQuantity: (productId, quantity) => {
          if (quantity <= 0) {
            get().removeItem(productId);
          } else {
            updateItems(items =>
              items.map(item =>
                item.product.id === productId
                  ? { ...item, quantity }
                  : item
              )
            );
          }
        },

        clearCart: () => set({ items: [] }),

        getSubtotal: (productId) => {
          const item = findItem(productId);
          return item ? item.product.price * item.quantity : 0;
        },

        getTotal: () =>
          get().items.reduce(
            (total, item) => total + item.product.price * item.quantity,
            0
          )
      };
    },
    {
      name: 'cart-storage',
    }
  )
);
