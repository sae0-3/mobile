import { BaseRepository } from '../../../core/common/base.repository';
import { Dealer, DealerInsert, DealerUpdate } from '../types/dealer.type';

export class DealerRepository extends BaseRepository {
  async findAll(): Promise<Dealer[]> {
    const sql = `
      SELECT * FROM dealers`;
    return await this.query<Dealer>(sql);
  }

  async findById(id: string): Promise<Dealer | null> {
    const sql = `
      SELECT * FROM dealers
      WHERE user_id = $1`;
    return await this.queryOne<Dealer>(sql, [id]);
  }

  async create(user: DealerInsert): Promise<Dealer | null> {
    return await this.insert<Dealer>('dealers', user);
  }

  async update(id: string, updates: DealerUpdate): Promise<Dealer | null> {
    return await this.updateById<Dealer>('dealers', id, updates);
  }
}
