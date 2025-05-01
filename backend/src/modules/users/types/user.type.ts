export interface User {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface UserInsert {
  email: string;
}

export type UserUpdate = Partial<UserInsert>;
