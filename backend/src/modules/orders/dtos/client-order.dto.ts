import { z } from 'zod';

export const OrderDetailsInsertSchema = z.object({
  product_id: z
    .string()
    .uuid(),

  quantity: z
    .number()
    .int()
    .positive(),

  subtotal: z
    .number()
    .nonnegative(),
});

export const ClientOrderInsertSchema = z.object({
  user_address_id: z
    .string()
    .uuid(),

  total: z
    .number()
    .nonnegative(),

  items: z
    .array(OrderDetailsInsertSchema)
    .min(1),
});

export type ClientOrderInsertDto = z.infer<typeof ClientOrderInsertSchema>;
export type OrderDetailsInsertDto = z.infer<typeof OrderDetailsInsertSchema>;
