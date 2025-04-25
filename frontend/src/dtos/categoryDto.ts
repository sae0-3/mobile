import { z } from 'zod';

export const CategoryInsertSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'El nombre de la categoria no puede estar vacio' }),

  visible: z
    .boolean()
    .optional(),

  display_order: z
    .number({
      invalid_type_error: 'Debe ser un número válido',
    })
    .optional(
  )
});

export type CategoryInsertSchema = z.infer<typeof CategoryInsertSchema>;

export const CategoryUpdateSchema = CategoryInsertSchema.partial();

export type CategoryUpdateDto = z.infer<typeof CategoryUpdateSchema>;
