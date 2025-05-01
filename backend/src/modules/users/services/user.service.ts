import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../types/user.type';

export class UserService {
  constructor(
    private userRepository: UserRepository,
  ) { }

  async findByEmail(email: string): Promise<User | void> { }

  async findById(id: string): Promise<User | void> { }

  async create(data: CreateUserDto): Promise<User | void> { }

  async update(id: string, data: UpdateUserDto): Promise<User | void> { }

  async delete(id: string): Promise<User | void> { }
}
