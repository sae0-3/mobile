import { z } from 'zod';

export const LocationInsertSchema = z.object({
  address: z
    .string()
    .min(1),

  latitud: z
    .number()
    .min(-90, 'La latitud mínima es -90')
    .max(90, 'La latitud máxima es 90')
    .optional()
    .nullable(),

  longitud: z
    .number()
    .min(-180, 'La longitud mínima es -180')
    .max(180, 'La longitud máxima es 180')
    .optional()
    .nullable(),
});

export type LocationInsertDto = z.infer<typeof LocationInsertSchema>;
