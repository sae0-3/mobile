import { User } from './user.type';

export interface Dealer extends User {
  vehicle_type: 'motorcycle' | 'bicycle' | 'car';
}

export interface DealerInsert {
  user_id: string;
  vehicle_type: 'motorcycle' | 'bicycle' | 'car';
}

export type DealerUpdate = Partial<Omit<DealerInsert, 'user_id'>>;
