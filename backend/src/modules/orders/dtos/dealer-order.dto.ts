import { z } from 'zod';

export const DealerOrderDeliverySchema = z.object({
  id: z.string().uuid(),
  delivery_id: z.string().uuid(),
});

export type DealerOrderDeliveryDto = z.infer<typeof DealerOrderDeliverySchema>;
