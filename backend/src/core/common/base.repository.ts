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
}
