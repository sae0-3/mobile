import { RequestHandler } from 'express';
import { LocationService } from '../services/location.service';
import { responseBuilder } from '../../../core/common/response-builder';

export class LocationController {
  constructor(
    private locationService: LocationService,
  ) { }

  getAll: RequestHandler = async (req, res, next) => {
    const user_id = req.user?.id || '';
    const data = await this.locationService.findAll(user_id);

    try {
      responseBuilder(res, {
        statusCode: 200,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  create: RequestHandler = async (req, res, next) => {
    try {
      const user_id = req.user?.id || '';
      const location = req.body;
      const data = await this.locationService.create(user_id, location);

      responseBuilder(res, {
        statusCode: 201,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  remove: RequestHandler = async (req, res, next) => {
    try {
      const id = req.params.id;
      const user_id = req.user?.id || '';

      await this.locationService.delete(id, user_id);

      responseBuilder(res, { statusCode: 204 });
    } catch (error) {
      next(error);
    }
  }
}
