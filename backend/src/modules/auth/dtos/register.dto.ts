import { z } from 'zod';

export const RegisterDto = z.object({
  email: z
    .string()
    .min(1, 'Email vacío')
    .email({ message: 'Formato de email inválido' }),

  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
      'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial'
    ),

  name: z.string()
    .max(100, 'Nombre muy largo')
    .min(1, 'Nombre Vacio')
});

export type RegisterDto = z.infer<typeof RegisterDto>;
