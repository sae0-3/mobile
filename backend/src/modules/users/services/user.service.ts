import { validateDto } from '../../../core/common/validation';
import { AppError, ValidationError } from '../../../core/errors/app.error';
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
      throw new ValidationError({
        publicMessage: 'El email ya está registrado',
        internalMessage: `Intento de registrar con email existente: ${data.email}`,
      });
    }

    const user = await this.userRepository.create(data.email, data.name);
    if (!user) {
      throw new AppError({
        internalMessage: `No se logro crear el usuario con la información: ${data}`,
      });
    }

    return user;
  }
}
