import { validateDto } from '../../../core/common/validation';
import { AppError, NotFoundError, ValidationError } from '../../../core/errors/app.error';
import { LocationInsertDto, LocationInsertSchema } from '../dtos/location.dto';
import { LocationRepository } from '../repositories/location.repository';

export class LocationService {
  constructor(
    private locationRepository: LocationRepository,
  ) { }

  async findAll(user_id: string): Promise<Location[]> {
    if (!user_id) {
      throw new NotFoundError();
    }

    return await this.locationRepository.findAll(user_id);
  }

  async create(user_id: string, location: LocationInsertDto): Promise<Location> {
    if (!user_id) {
      throw new ValidationError();
    }

    await validateDto(LocationInsertSchema, location);

    const created = await this.locationRepository.create({ ...location, user_id });

    if (!created) {
      throw new AppError({
        publicMessage: 'Se produjo un error al registrar la ubicación'
      });
    }

    return created;
  }

  async delete(location_id: string, user_id: string): Promise<Location> {
    if (!location_id || !user_id) {
      throw new NotFoundError();
    }

    const deleted = await this.locationRepository.delete(location_id, user_id);

    if (!deleted) {
      throw new NotFoundError();
    }

    return deleted;
  }

  async findById(location_id: string, user_id: string): Promise<Location> {
    if (!location_id || !user_id) {
      throw new NotFoundError();
    }

    const location = await this.locationRepository.findByid(location_id, user_id);

    if (!location) {
      throw new NotFoundError();
    }

    return location;
  }
}
