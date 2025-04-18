export interface AuthProvider {
  id: string;
  user_id: string;
  provider: 'local' | 'google';
  provider_user_id?: string | null;
  password_hash?: string | null;
  created_at: Date;
  updated_at: Date;
}
