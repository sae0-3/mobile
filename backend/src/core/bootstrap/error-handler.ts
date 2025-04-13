import { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/app.error';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const message = err.message || 'Error interno del servidor';

  res.status(statusCode).json({ message });
};
