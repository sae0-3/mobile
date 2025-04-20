import { RequestHandler } from 'express';
import passport from 'passport';
import { UnauthorizedError } from '../errors/app.error';
import { CustomJwtPayload } from '../types/custom-jwt-payload.type';

export const authenticateJwt: RequestHandler = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (
    err: any,
    user: CustomJwtPayload | false,
    info: any
  ) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return next(new UnauthorizedError());
    }

    req.user = user;
    next();
  })(req, res, next);
};
