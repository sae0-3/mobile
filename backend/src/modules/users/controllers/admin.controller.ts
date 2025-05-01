import { RequestHandler } from 'express';
import { responseBuilder } from '../../../core/common/response-builder';
import { AdminService } from '../services/admin.service';

export class AdminController {
  constructor(
    private adminService: AdminService,
  ) { }

  insert: RequestHandler = async (req, res, next) => {
    try {
      const admin = req.body;
      const data = await this.adminService.create(admin);

      responseBuilder(res, {
        statusCode: 201,
        data
      });
    } catch (error) {
      next(error);
    }
  }

  deleteById: RequestHandler = async (req, res, next) => {
    try {
      const id = req.params.id;
      await this.adminService.delete(id);

      responseBuilder(res, { statusCode: 204 });
    } catch (error) {
      next(error);
    }
  }
}
