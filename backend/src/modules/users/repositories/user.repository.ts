import { BaseRepository } from '../../../core/common/base.repository';
import { User, UserInsert, UserUpdate } from '../types/user.type';

export class UserRepository extends BaseRepository {
  async findByEmail(email: string): Promise<User | null> {
    const sql = `
      SELECT * FROM users WHERE email = $1`;
    return await this.queryOne<User>(sql, [email]);
  }

  async findById(id: string): Promise<User | null> {
    const sql = `
      SELECT * FROM users WHERE user_id = $1`;
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
}
