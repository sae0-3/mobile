import { BaseRepository } from '../../../core/common/base.repository';
import { Admin, AdminInsert } from '../types/admin.type';

export class AdminRepository extends BaseRepository {
  async create(user: AdminInsert): Promise<Admin | null> {
    return await this.insert<Admin>('admins', user);
  }
}
