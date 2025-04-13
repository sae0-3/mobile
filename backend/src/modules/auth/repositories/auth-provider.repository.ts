import { BaseRepository } from '../../../core/common/base.repository';
import { AuthProvider } from '../types/auth-provider.type';

export class AuthProviderRepository extends BaseRepository {
  async createLocal(userId: string, passwordHash: string): Promise<AuthProvider | null> {
    const sql = `
      INSERT INTO auth_providers (user_id, provider, password_hash)
      VALUES ($1, 'local', $2)
      RETURNING *`;
    return await this.queryOne<AuthProvider>(sql, [userId, passwordHash]);
  }

  async findByUserId(userId: string): Promise<AuthProvider | null> {
    const sql = `
      SELECT * FROM auth_providers
      WHERE user_id = $1
      LIMIT 1`;
    return await this.queryOne<AuthProvider>(sql, [userId]);
  }
}
