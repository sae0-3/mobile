import { z } from 'zod';

export const OrderDeliveryDto = z.object({
  id: z.string().uuid(),
  delivery_id: z.string().uuid(),
});

export type OrderDeliveryDto = z.infer<typeof OrderDeliveryDto>;
