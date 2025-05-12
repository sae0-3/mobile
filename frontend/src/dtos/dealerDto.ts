import { z } from 'zod';

export const DealerRegisterSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'El nombre no puede estar vacío' }),

  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
      'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial'
    ),

  email: z
    .string()
    .min(1, 'El correo no puede estar vacío')
    .email('El formato del correo no es válido'),

  vehicle: z
    .enum(['motorcycle', 'bicycle', 'car'], {
      message: 'El vehiculo no es una opción válida'
    }),
});

export type DealerRegisterSchema = z.infer<typeof DealerRegisterSchema>;
