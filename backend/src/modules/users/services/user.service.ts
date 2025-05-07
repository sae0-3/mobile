import { validateDto } from '../../../core/common/validation';
import { AppError, NotFoundError } from '../../../core/errors/app.error';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../types/user.type';

export class UserService {
  constructor(
    private userRepository: UserRepository,
  ) { }

  async findByEmail(email: string): Promise<User> {
    if (!email) {
      throw new NotFoundError({
        publicMessage: 'El email proporcionado no es válido',
        internalMessage: 'El email esta vacío',
      });
    }

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundError({
        publicMessage: 'Usuario no encontrado',
      });
    }

    return user;
  }

  async findById(id: string): Promise<User> {
    if (!id) {
      throw new NotFoundError({
        publicMessage: 'El id proporcionado no es válido',
        internalMessage: 'El id esta vacío',
      });
    }

    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundError({
        publicMessage: 'Usuario no encontrado',
      });
    }

    return user;
  }

  async create(data: CreateUserDto): Promise<User> {
    await validateDto(CreateUserDto, data);

    const user = await this.userRepository.findByEmail(data.email);

    if (user) {
      throw new AppError({
        publicMessage: 'El email ya fue registrado',
      });
    }

    const created = await this.userRepository.create(data);

    if (!created) {
      throw new AppError({
        internalMessage: 'Error en la creación del usuario',
      });
    }

    return created;
  }

  async update(id: string, data: UpdateUserDto): Promise<User> {
    if (!id) {
      throw new NotFoundError({
        publicMessage: 'El id proporcionado no es válido',
        internalMessage: 'El id esta vacío',
      });
    }

    await validateDto(UpdateUserDto, data);

    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundError({
        publicMessage: 'Usuario no encontrado',
      });
    }

    const updated = await this.userRepository.update(id, data);

    if (!updated) {
      throw new AppError({
        internalMessage: 'Error en la actualización del usuario',
      });
    }

    return updated;
  }

  async delete(id: string): Promise<User> {
    if (!id) {
      throw new NotFoundError({
        publicMessage: 'El id proporcionado no es válido',
        internalMessage: 'El id esta vacío',
      });
    }

    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundError({
        publicMessage: 'Usuario no encontrado',
      });
    }

    const deleted = await this.userRepository.delete(id);

    if (!deleted) {
      throw new AppError({
        internalMessage: 'Error en la eliminación del usuario',
      });
    }

    return deleted;
  }
}
