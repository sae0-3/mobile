import { z } from 'zod';

export const ProductInsertDto = z.object({
  name: z.string().min(1),
  price: z.number().positive(),
  description: z.string().nullable().optional(),
  img_reference: z.string().nullable().optional(),
  ingredients: z.array(z.string()).nullable().optional(),
  available: z.boolean().optional(),
  visible: z.boolean().optional(),
  display_order: z.number().optional()
});

export type ProductInsertDto = z.infer<typeof ProductInsertDto>;

export const ProductUpdateDto = ProductInsertDto.partial();

export type ProductUpdateDto = z.infer<typeof ProductUpdateDto>;
