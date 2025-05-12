import { z } from 'zod';
import { IntFromString } from '../utils/validator';

export const CategoryInsertSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'El nombre de la categoria no puede estar vacio' }),

  visible: z
    .boolean(),

  display_order: IntFromString,
});

export const CategoryUpdateSchema = CategoryInsertSchema.partial();

export type CategoryInsertDto = z.infer<typeof CategoryInsertSchema>;
export type CategoryUpdateDto = z.infer<typeof CategoryUpdateSchema>;

export const defaultValues: CategoryInsertDto = {
  name: '',
  display_order: 0,
  visible: true,
};
