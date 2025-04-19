import { pool } from './database';

export abstract class BaseRepository {
  protected async query<T>(sql: string, params?: any[]): Promise<T[]> {
    const { rows } = await pool.query(sql, params);
    return rows as T[];
  }

  protected async queryOne<T>(sql: string, params?: any[]): Promise<T | null> {
    const result = await this.query<T>(sql, params);
    return result[0] || null;
  }

  protected async insert<T>(table: string, data: Record<string, any>): Promise<T | null> {
    const fields = Object.keys(data);
    if (fields.length === 0) return null;

    const columns = fields.join(', ');
    const values = Object.values(data);
    const placeholders = fields.map((_, i) => `$${i + 1}`).join(', ');

    const sql = `INSERT INTO ${table} (${columns}) VALUES (${placeholders}) RETURNING *`;
    return await this.queryOne<T>(sql, values);
  }

  protected async updateById<T>(table: string, id: string, updates: Record<string, any>): Promise<T | null> {
    const fields = Object.keys(updates);
    if (fields.length === 0) return null;

    const setClause = fields.map((field, i) => `${field} = $${i + 1}`).join(', ');
    const values = Object.values(updates);
    values.push(id);

    const sql = `UPDATE ${table} SET ${setClause} WHERE id = $${values.length} RETURNING *`;
    return await this.queryOne<T>(sql, values);
  }

  protected async deleteById<T>(table: string, id: string): Promise<T | null> {
    const sql = `DELETE FROM ${table} WHERE id = $1 RETURNING *`;
    return await this.queryOne<T>(sql, [id]);
  }
}
