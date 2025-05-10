import { User } from './user.type';

export interface Dealer extends User {
  name: string;
  vehicle: 'motorcycle' | 'bicycle' | 'car';
}

export interface DealerInsert {
  user_id: string;
  name: string;
  vehicle: 'motorcycle' | 'bicycle' | 'car';
}

export type DealerUpdate = Partial<Omit<DealerInsert, 'user_id'>>;
