import { BaseRepository } from '../../../core/common/base.repository';
import { LocationInsert } from '../types/location.type';

export class LocationRepository extends BaseRepository {
  async findAll(user_id: string): Promise<Location[]> {
    const sql = `
      SELECT * FROM user_address
      WHERE user_id = $1
    `;

    return await this.query<Location>(sql, [user_id]);
  }

  async findByid(location_id: string, user_id: string): Promise<Location | null> {
    const sql = `
      SELECT * FROM user_address
      WHERE id = $1 AND user_id = $2
    `;

    return await this.queryOne<Location>(sql, [location_id, user_id]);
  }

  async create(location: LocationInsert): Promise<Location | null> {
    return await this.insert<Location>('user_address', location);
  }

  async delete(location_id: string, user_id: string): Promise<Location | null> {
    const sql = `
      DELETE FROM user_address
      WHERE id = $1 AND user_id = $2
      RETURNING *
    `;

    return await this.queryOne<Location>(sql, [location_id, user_id]);
  }
}
