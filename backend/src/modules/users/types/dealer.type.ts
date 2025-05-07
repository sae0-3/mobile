import { User } from './user.type';

export interface Dealer extends User {
  vehicle: 'motorcycle' | 'bicycle' | 'car';
}

export interface DealerInsert {
  user_id: string;
  vehicle: 'motorcycle' | 'bicycle' | 'car';
}

export type DealerUpdate = Partial<Omit<DealerInsert, 'user_id'>>;
