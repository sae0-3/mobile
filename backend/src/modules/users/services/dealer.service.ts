import { CreateDealerDto, UpdateDealerDto } from '../dtos/dealer.dto';
import { DealerRepository } from '../repositories/dealer.repository';
import { Dealer } from '../types/dealer.type';

export class DealerService {
  constructor(
    private dealerRepository: DealerRepository,
  ) { }

  async findAll(): Promise<Dealer[] | void> { }

  async findById(id: string): Promise<Dealer | void> { }

  async create(data: CreateDealerDto): Promise<Dealer | void> { }

  async update(id: string, data: UpdateDealerDto): Promise<Dealer | void> { }

  async delete(id: string): Promise<Dealer | void> { }
}
