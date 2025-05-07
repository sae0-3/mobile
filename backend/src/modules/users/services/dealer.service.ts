import { validateDto } from '../../../core/common/validation';
import { AppError, NotFoundError } from '../../../core/errors/app.error';
import { CreateDealerDto, UpdateDealerDto } from '../dtos/dealer.dto';
import { DealerRepository } from '../repositories/dealer.repository';
import { Dealer } from '../types/dealer.type';
import { UserService } from './user.service';

export class DealerService {
  constructor(
    private dealerRepository: DealerRepository,
    private userService: UserService,
  ) { }

  async findAll(): Promise<Dealer[]> {
    return await this.dealerRepository.findAll();
  }

  async findById(id: string): Promise<Dealer> {
    if (!id) {
      throw new NotFoundError();
    }

    const dealer = await this.dealerRepository.findById(id);

    if (!dealer) {
      throw new NotFoundError();
    }

    return dealer;
  }

  async create(data: CreateDealerDto): Promise<Dealer> {
    await validateDto(CreateDealerDto, data);

    const user = await this.userService.create({
      email: data.email,
    });

    const created = await this.dealerRepository.create({
      user_id: user.id,
      vehicle: data.vehicle,
    });

    if (!created) {
      throw new AppError({});
    }

    return created
  }

  async update(id: string, data: UpdateDealerDto): Promise<Dealer> {
    if (!id) {
      throw new NotFoundError();
    }

    await validateDto(UpdateDealerDto, data);

    const existing = await this.dealerRepository.findById(id);
    if (!existing) {
      throw new NotFoundError();
    }

    await this.userService.update(id, {
      email: data.email,
    });

    const updated = await this.dealerRepository.update(id, {
      vehicle: data.vehicle,
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
