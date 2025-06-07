import { z } from 'zod';

export const ClientRegisterSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'El nombre es obligatorio' }),

  password: z
    .string()
    .min(1, { message: 'La contraseña es obligatoria' })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
      {
        message: 'Debe contener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo'
      }
    ),

  email: z
    .string()
    .min(1, { message: 'El correo electrónico es obligatorio' })
    .email({ message: 'Ingresa un correo electrónico válido (ejemplo: usuario@dominio.com)' }),

  phone: z
    .union([
      z.literal('').or(z.undefined()).transform(() => undefined),
      z.string()
        .length(8, { message: 'El teléfono debe tener exactamente 8 dígitos' })
        .regex(/^\d+$/, { message: 'El teléfono solo puede contener números (0-9)' })
    ], {
      errorMap: () => ({ message: 'El teléfono debe estar vacío o tener 8 dígitos numéricos' })
    })
});

export type ClientRegisterDto = z.infer<typeof ClientRegisterSchema>;

export const defaultValues: ClientRegisterDto = {
  name: '',
  email: '',
  password: '',
  phone: undefined,
};

export const ClientUpdateProfileSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'El nombre es obligatorio' }),

  email: z
    .string()
    .min(1, { message: 'El correo electrónico es obligatorio' })
    .email({ message: 'Ingresa un correo electrónico válido (ejemplo: usuario@dominio.com)' }),

  phone: z
    .union([
      z.literal('').transform(() => undefined),
      z.string()
        .length(8, { message: 'El teléfono debe tener exactamente 8 dígitos' })
        .regex(/^\d+$/, { message: 'El teléfono solo puede contener números (0-9)' })
    ], {
      errorMap: () => ({ message: 'El teléfono debe estar vacío o tener 8 dígitos numéricos' })
    })
});

export type ClientUpdateProfileDto = z.infer<typeof ClientUpdateProfileSchema>;