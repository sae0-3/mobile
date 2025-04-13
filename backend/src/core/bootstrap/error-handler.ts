import { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/app.error';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const message = err instanceof AppError ? err.publicMessage : 'Error interno del servidor';

  console.error('[ERROR]', err);

  res.status(statusCode).json({
    success: false,
    error: {
      message,
      code: statusCode
    },
  });
};
