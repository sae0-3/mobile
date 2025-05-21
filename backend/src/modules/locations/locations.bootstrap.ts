import { LocationController } from './controllers/location.controller';
import { LocationRepository } from './repositories/location.repository';
import { LocationService } from './services/location.service';

export function createLocationController() {
  const locationRepository = new LocationRepository();

  const locationService = new LocationService(locationRepository);

  return new LocationController(locationService);
}
