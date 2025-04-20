import { PassportStatic } from 'passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { config } from '../../config/env';
import { UnauthorizedError } from '../errors/app.error';
import { CustomJwtPayload } from '../types/custom-jwt-payload.type';

export const configurePassport = (passport: PassportStatic) => {
  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.JWT_SECRET,
      },
      async (payload: CustomJwtPayload, done) => {
        try {
          return done(null, payload);
        } catch (err) {
          return done(new UnauthorizedError(), false);
        }
      }
    )
  );
};
