import { CreateClientDto, UpdateClientDto } from '../dtos/client.dto';
import { ClientRepository } from '../repositories/client.repository';
import { Client } from '../types/client.type';

export class ClientService {
  constructor(
    private clientRepository: ClientRepository,
  ) { }

  async findAll(): Promise<Client[] | void> { }

  async findById(id: string): Promise<Client | void> { }

  async create(data: CreateClientDto): Promise<Client | void> { }

  async update(id: string, data: UpdateClientDto): Promise<Client | void> { }

  async delete(id: string): Promise<Client | void> { }
}
