import { OrderWithDetails as OWD } from './order.type';

export type OrderWithDetails = Omit<OWD, 'client' | 'dealer' | 'location' | 'items'> & {
  items: number;
};
