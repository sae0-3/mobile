import { BaseRepository } from '../../../core/common/base.repository';
import { User } from '../types/user.type';

export class UserRepository extends BaseRepository {
  async findByEmail(email: string): Promise<User | null> {
    const sql = `SELECT * FROM users WHERE email = $1`;
    return await this.queryOne<User>(sql, [email]);
  }

  async create(email: string, name?: string): Promise<User | null> {
    const sql = `
      INSERT INTO users (email, name)
      VALUES ($1, $2)
      RETURNING *`;
    return await this.queryOne<User>(sql, [email, name || null]);
  }
}
