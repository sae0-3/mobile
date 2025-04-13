import { validateDto } from '../../../core/common/validation';
import { UserDto } from '../dtos/user.dto';
import { UserRepository } from '../repositories/user.repository';

export class UserService {
  constructor(
    private userRepository: UserRepository,
  ) { }

  async findByEmail(data: UserDto) {
    await validateDto(UserDto, data);
    return this.userRepository.findByEmail(data.email);
  }

  async create(data: UserDto) {
    await validateDto(UserDto, data);

    const existing = await this.userRepository.findByEmail(data.email);

    if (existing) {
      throw new Error('Email ya registrado');
    }

    return await this.userRepository.create(data.email, data.name);
  }
}
