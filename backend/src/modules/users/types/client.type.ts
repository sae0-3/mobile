import { User } from './user.type';

export interface Client extends User {
  name: string;
  phone: string | null;
}

export interface ClientInsert {
  user_id: string;
  name: string;
  phone?: string | null;
}

export type ClientUpdate = Partial<Omit<ClientInsert, 'user_id'>>;
