import { z } from 'zod';

export const ProductCategoryDto = z.object({
  product_id: z.string().uuid(),
  category_id: z.string().uuid(),
});

export const ProductCategoriesDto = z.object({
  product_id: z.string().uuid(),
  category_ids: z.array(z.string().uuid()),
});

export type ProductCategoryDto = z.infer<typeof ProductCategoryDto>;
export type ProductCategoriesDto = z.infer<typeof ProductCategoriesDto>;
