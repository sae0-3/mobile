import 'express';
import { CustomJwtPayload } from './custom-jwt-payload.type';

declare global {
  namespace Express {
    interface User extends CustomJwtPayload { }
  }
}
