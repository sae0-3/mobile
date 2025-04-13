import { z } from 'zod';

export const LoginDto = z.object({
  email: z
    .string()
    .min(1, 'Email vacío')
    .email({ message: 'Formato de email inválido' }),

  password: z
    .string()
    .min(1, { message: 'Contraseña vacia' }),
});

export type LoginDto = z.infer<typeof LoginDto>;
