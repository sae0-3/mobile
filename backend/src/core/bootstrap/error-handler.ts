import { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/app.error';
import { ControllerResponse } from '../types/controller-response.type';
import { responseBuilder } from '../common/response-builder';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const message = err instanceof AppError ? err.publicMessage : 'Error interno del servidor';

  console.error('[ERROR]', err);

  responseBuilder(res, {
    success: false,
    statusCode,
    message
  });
};
