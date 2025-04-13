import { RequestHandler, response } from 'express';
import { AuthService } from '../services/auth.service';
import { ControllerResponse } from '../../../core/types/controller-response.type';
import { responseBuilder } from '../../../core/common/response-builder';

export class AuthController {
  constructor(
    private authService: AuthService,
  ) { }

  register: RequestHandler = async (req, res, next) => {
    try {
      const authProvider = await this.authService.register(req.body);
      responseBuilder(res, {
        statusCode: 201,
        data: {
          id: authProvider.user_id,
          access_token: authProvider.access_token,
        },
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
