import { z } from 'zod';

export const CreateDealerDto = z.object({
  email: z
    .string()
    .email(),

  name: z
    .string()
    .min(1),

  vehicle: z
    .enum(['motorcycle', 'bicycle', 'car']),
});

export type CreateDealerDto = z.infer<typeof CreateDealerDto>;

export const UpdateDealerDto = CreateDealerDto.partial();

export type UpdateDealerDto = z.infer<typeof UpdateDealerDto>;
