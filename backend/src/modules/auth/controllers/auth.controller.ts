import { RequestHandler } from 'express';
import { AuthService } from '../services/auth.service';
import { responseBuilder } from '../../../core/common/response-builder';

export class AuthController {
  constructor(
    private authService: AuthService,
  ) { }

  register: RequestHandler = async (req, res, next) => {
    try {
      const data = await this.authService.register(req.body);

      responseBuilder(res, {
        statusCode: 201,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  login: RequestHandler = async (req, res, next) => {
    try {
      const data = await this.authService.login(req.body);

      responseBuilder(res, {
        statusCode: 200,
        data,
      });
    } catch (error) {
      next(error);
    }
  }
}
