import { validateDto } from '../../../core/common/validation';
import { AppError, NotFoundError } from '../../../core/errors/app.error';
import { CreateClientDto, UpdateClientDto } from '../dtos/client.dto';
import { ClientRepository } from '../repositories/client.repository';
import { Client } from '../types/client.type';
import { UserService } from './user.service';

export class ClientService {
  constructor(
    private clientRepository: ClientRepository,
    private userService: UserService,
  ) { }

  async findAll(): Promise<Client[]> {
    return await this.clientRepository.findAll();
  }

  async findById(id: string): Promise<Client> {
    if (!id) {
      throw new NotFoundError();
    }

    const client = await this.clientRepository.findById(id);

    if (!client) {
      throw new NotFoundError();
    }

    return client;
  }

  async create(data: CreateClientDto): Promise<Client> {
    await validateDto(CreateClientDto, data);

    const user = await this.userService.create({
      email: data.email,
    });

    const created = await this.clientRepository.create({
      user_id: user.id,
      phone: data.phone,
      name: data.name,
    });

    if (!created) {
      throw new AppError({});
    }

    return created;
  }

  async update(id: string, data: UpdateClientDto): Promise<Client> {
    if (!id) {
      throw new NotFoundError();
    }

    await validateDto(UpdateClientDto, data);

    const existing = await this.clientRepository.findById(id);
    if (!existing) {
      throw new NotFoundError();
    }

    await this.userService.update(id, {
      email: data.email,
    });

    const updated = await this.clientRepository.update(id, {
      name: data.name,
      phone: data.phone,
    });

    if (!updated) {
      throw new AppError({});
    }

    return updated;
  }

  async delete(id: string): Promise<string> {
    if (!id) {
      throw new NotFoundError();
    }

    const deleted = await this.userService.delete(id);

    return deleted.id;
  }
}
