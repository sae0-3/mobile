import { BaseRepository } from '../../../core/common/base.repository';
import { Client, ClientInsert, ClientUpdate } from '../types/client.type';

export class ClientRepository extends BaseRepository {
  async findAll(): Promise<Client[]> {
    const sql = `
      SELECT 
        u.id, u.email, u.created_at, u.updated_at,
        c.name, c.phone
      FROM clients c
      JOIN users u ON u.id = c.user_id
    `;
    return await this.query<Client>(sql);
  }

  async findById(id: string): Promise<Client | null> {
    const sql = `
      SELECT 
        u.id, u.email, u.created_at, u.updated_at,
        c.name, c.phone
      FROM clients c
      JOIN users u ON u.id = c.user_id
      WHERE u.id = $1
    `;
    return await this.queryOne<Client>(sql, [id]);
  }

  async create(user: ClientInsert): Promise<Client | null> {
    await this.insert<Client>('clients', user);
    return await this.findById(user.user_id);
  }

  async update(id: string, updates: ClientUpdate): Promise<Client | null> {
    const fields = Object.keys(updates);
    if (fields.length === 0) return await this.findById(id);

    const setClause = fields.map((field, i) => `${field} = $${i + 1}`).join(', ');
    const values = Object.values(updates);
    values.push(id);

    const sql = `
    UPDATE clients
    SET ${setClause}
    WHERE user_id = $${values.length}
    RETURNING *
    `;
    await this.queryOne<Client>(sql, values);
    return await this.findById(id);
  }
}
