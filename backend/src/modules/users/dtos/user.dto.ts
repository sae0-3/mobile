import { z } from 'zod';

export const UserDto = z.object({
  email: z
    .string()
    .min(1, 'Email vacío')
    .email({ message: 'Formato de email inválido' }),

  name: z
    .string()
    .max(100, 'Nombre muy largo')
    .min(1, 'Nombre vacío')
    .optional(),
});

export type UserDto = z.infer<typeof UserDto>;
