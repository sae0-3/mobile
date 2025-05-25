import { BaseRepository } from '../../../core/common/base.repository';
import { Dealer, DealerInsert, DealerUpdate } from '../types/dealer.type';

export class DealerRepository extends BaseRepository {
  async findAll(): Promise<Dealer[]> {
    const sql = `
      SELECT 
        u.id, u.email, u.created_at, u.updated_at,
        d.vehicle, d.name
      FROM dealers d
      JOIN users u ON u.id = d.user_id
    `;
    return await this.query<Dealer>(sql);
  }

  async findById(id: string): Promise<Dealer | null> {
    const sql = `
      SELECT 
        u.id, u.email, u.created_at, u.updated_at,
        d.vehicle, d.name
      FROM dealers d
      JOIN users u ON u.id = d.user_id
      WHERE u.id = $1
    `;
    return await this.queryOne<Dealer>(sql, [id]);
  }

  async create(data: DealerInsert): Promise<Dealer | null> {
    await this.insert<Dealer>('dealers', data);
    return await this.findById(data.user_id);
  }

  async update(id: string, updates: DealerUpdate): Promise<Dealer | null> {
    await this.updateById<Dealer>('dealers', id, updates);
    return await this.findById(id);
  }
}
