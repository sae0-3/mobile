import { User } from './user.type';

export interface Admin extends User { }

export interface AdminInsert {
  user_id: string;
}

export type AdminUpdate = Partial<Omit<AdminInsert, 'user_id'>>;
