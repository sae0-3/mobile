import { z } from 'zod';

export const CreateClientDto = z.object({
  email: z
    .string()
    .email(),

  name: z
    .string()
    .min(1),

  phone: z
    .string()
    .nullable()
    .optional(),
});

export type CreateClientDto = z.infer<typeof CreateClientDto>;

export const UpdateClientDto = CreateClientDto.partial();

export type UpdateClientDto = z.infer<typeof UpdateClientDto>;
