import { z } from 'zod';

export const CreateAdminDto = z.object({
  email: z
    .string()
    .email(),
});

export type CreateAdminDto = z.infer<typeof CreateAdminDto>;

export const UpdateAdminDto = CreateAdminDto.partial();

export type UpdateAdminDto = z.infer<typeof UpdateAdminDto>;
