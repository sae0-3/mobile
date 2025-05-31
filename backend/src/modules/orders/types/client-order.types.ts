import { OrderWithDetails as OWD } from './order.type';

export type OrderWithDetails = Omit<OWD, 'dealer' | 'client'>;
