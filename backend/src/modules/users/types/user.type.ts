export interface User {
  id: string;
  email: string;
  name?: string;
  role: 'client' | 'dealer' | 'admin';
  created_at: Date;
  updated_at: Date;
}
