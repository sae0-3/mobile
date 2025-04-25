import { z } from 'zod';

export const CategoryInsertDto = z.object({
  name: z.string().min(1),
  visible: z.boolean().optional(),
  display_order: z.number().optional()
});

export type CategoryInsertDto = z.infer<typeof CategoryInsertDto>;

export const CategoryUpdateDto = CategoryInsertDto.partial();

export type CategoryUpdateDto = z.infer<typeof CategoryUpdateDto>;
