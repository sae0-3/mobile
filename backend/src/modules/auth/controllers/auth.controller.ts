import { RequestHandler } from 'express';
import { AuthService } from '../services/auth.service';

export class AuthController {
  constructor(
    private authService: AuthService,
  ) { }

  register: RequestHandler = async (req, res, next) => {
    try {
      const user = await this.authService.register(req.body);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  login: RequestHandler = async (req, res, next) => {
    try {
      const token = await this.authService.login(req.body);
      res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  }
}
