import { BaseRepository } from '../../../core/common/base.repository';
import { User, UserInsert, UserRole, UserUpdate } from '../types/user.type';

export class UserRepository extends BaseRepository {
  async findByEmail(email: string): Promise<User | null> {
    const sql = `
      SELECT * FROM users WHERE email = $1`;
    return await this.queryOne<User>(sql, [email]);
  }

  async findById(id: string): Promise<User | null> {
    const sql = `
      SELECT * FROM users WHERE id = $1`;
    return await this.queryOne<User>(sql, [id]);
  }

  async create(user: UserInsert): Promise<User | null> {
    return await this.insert<User>('users', user);
  }

  async update(id: string, updates: UserUpdate): Promise<User | null> {
    return await this.updateById<User>('users', id, updates);
  }

  async delete(id: string): Promise<User | null> {
    return await this.deleteById<User>('users', id);
  }

  async getRoleById(id: string): Promise<UserRole | null> {
    const sql = `
      SELECT
        CASE
            WHEN a.user_id IS NOT NULL THEN 'admin'
            WHEN c.user_id IS NOT NULL THEN 'client'
            WHEN d.user_id IS NOT NULL THEN 'dealer'
        END AS role
      FROM users u
        LEFT JOIN admins a ON u.id = a.user_id
        LEFT JOIN clients c ON u.id = c.user_id
        LEFT JOIN dealers d ON u.id = d.user_id
      WHERE u.id = $1;
    `;
    return await this.queryOne<UserRole>(sql, [id]);
  }
}
