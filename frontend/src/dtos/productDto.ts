import { z } from 'zod';

export const ProductInsertSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'El nombre del producto no puede estar vacío' }),

  price: z
    .number({
      required_error: 'El precio es obligatorio',
      invalid_type_error: 'El precio debe ser un número válido',
    })
    .positive('El precio debe ser mayor que 0'),

  description: z
    .string()
    .nullable()
    .optional(),

  img_reference: z
    .string()
    .nullable()
    .optional()
    .refine(
      (val) =>
        !val || /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(val),
      {
        message: 'Debe ser una URL válida (http, https, ftp)',
      }
    ),

  ingredients: z
    .array(z.string())
    .nullable()
    .optional(),

  available: z
    .boolean()
    .optional(),

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

export type ProductInsertDto = z.infer<typeof ProductInsertSchema>;

export const ProductUpdateSchema = ProductInsertSchema.partial();

export type ProductUpdateDto = z.infer<typeof ProductUpdateSchema>;
