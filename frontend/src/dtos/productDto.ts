import { z } from 'zod';
import { FloatFromString, IntFromString } from '../utils/validator';

export const ProductInsertSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'El nombre del producto no puede estar vacío' }),

  price: FloatFromString,

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

  display_order: IntFromString,
});

export const ProductUpdateSchema = ProductInsertSchema.partial();

export type ProductInsertDto = z.infer<typeof ProductInsertSchema>;
export type ProductUpdateDto = z.infer<typeof ProductUpdateSchema>;

export const defaultValues: ProductInsertDto = {
  name: '',
  price: 0,
  description: null,
  img_reference: null,
  ingredients: [],
  available: true,
  visible: true,
  display_order: 0,
};
