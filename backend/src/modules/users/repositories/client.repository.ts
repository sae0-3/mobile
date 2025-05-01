import { Client } from 'pg';
import { BaseRepository } from '../../../core/common/base.repository';
import { ClientInsert, ClientUpdate } from '../types/client.type';

export class ClientRepository extends BaseRepository {
  async findAll(): Promise<Client[]> {
    const sql = `
      SELECT * FROM clients`;
    return await this.query<Client>(sql);
  }

  async findById(id: string): Promise<Client | null> {
    const sql = `
      SELECT * FROM clients
      WHERE user_id = $1`;
    return await this.queryOne<Client>(sql, [id]);
  }

  async create(user: ClientInsert): Promise<Client | null> {
    return await this.insert<Client>('clients', user);
  }

  async update(id: string, updates: ClientUpdate): Promise<Client | null> {
    return await this.updateById<Client>('clients', id, updates);
  }
}
