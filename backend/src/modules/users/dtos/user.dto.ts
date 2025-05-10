import { z } from 'zod';

export const CreateUserDto = z.object({
  email: z
    .string()
    .min(1)
    .email(),
});

export type CreateUserDto = z.infer<typeof CreateUserDto>;

export const UpdateUserDto = CreateUserDto.partial();

export type UpdateUserDto = z.infer<typeof UpdateUserDto>;
