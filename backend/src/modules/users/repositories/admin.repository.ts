import { BaseRepository } from '../../../core/common/base.repository';
import { Admin, AdminInsert } from '../types/admin.type';

export class AdminRepository extends BaseRepository {
  async findById(id: string): Promise<Admin | null> {
    const sql = `
      SELECT 
        u.id, u.email, u.created_at, u.updated_at
      FROM admins a
      JOIN users u ON u.id = a.user_id
      WHERE u.id = $1
    `;
    return await this.queryOne<Admin>(sql, [id]);
  }

  async create(user: AdminInsert): Promise<Admin | null> {
    await this.insert<Admin>('admins', user);
    return await this.findById(user.user_id);
  }
}
