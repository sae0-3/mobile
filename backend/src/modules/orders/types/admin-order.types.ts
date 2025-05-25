import { OrderWithDetails as OWD } from './order.type';

export type OrderWithDetails = Omit<OWD, 'client' | 'dealer' | 'items'> & {
  items: number;
};
