import { validateDto } from '../../../core/common/validation';
import { AppError, NotFoundError } from '../../../core/errors/app.error';
import { CreateAdminDto } from '../dtos/admin.dto';
import { AdminRepository } from '../repositories/admin.repository';
import { Admin } from '../types/admin.type';
import { UserService } from './user.service';

export class AdminService {
  constructor(
    private adminRepository: AdminRepository,
    private userService: UserService,
  ) { }

  async findById(id: string): Promise<Admin> {
    if (!id) {
      throw new NotFoundError();
    }

    const admin = await this.adminRepository.findById(id);

    if (!admin) {
      throw new NotFoundError();
    }

    return admin;
  }

  async create(data: CreateAdminDto): Promise<Admin> {
    await validateDto(CreateAdminDto, data);

    const user = await this.userService.create({
      email: data.email,
    });

    const created = await this.adminRepository.create({
      user_id: user.id,
    });

    if (!created) {
      throw new AppError({});
    }

    return created;
  }

  async delete(id: string): Promise<string> {
    if (!id) {
      throw new NotFoundError();
    }

    const deleted = await this.userService.delete(id);

    return deleted.id;
  }
}
