import { CreateAdminDto } from '../dtos/admin.dto';
import { AdminRepository } from '../repositories/admin.repository';
import { Admin } from '../types/admin.type';

export class AdminService {
  constructor(
    private adminRepository: AdminRepository,
  ) { }

  async create(data: CreateAdminDto): Promise<Admin | void> { }

  async delete(id: string): Promise<Admin | void> { }
}
