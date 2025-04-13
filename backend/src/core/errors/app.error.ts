import { AppErrorParams } from '../types/app-error.type';

export class AppError extends Error {
  statusCode: number;
  publicMessage: string;

  constructor({
    publicMessage = 'Error interno del servidor',
    internalMessage,
    statusCode = 500
  }: AppErrorParams) {
    super(internalMessage || publicMessage);
    this.statusCode = statusCode;
    this.publicMessage = publicMessage;
  }
}

export class NotFoundError extends AppError {
  constructor(params?: Omit<AppErrorParams, 'statusCode'>) {
    super({ ...params, statusCode: 404, publicMessage: params?.publicMessage ?? 'Recurso no encontrado' });
  }
}

export class ValidationError extends AppError {
  constructor(params?: Omit<AppErrorParams, 'statusCode'>) {
    super({ ...params, statusCode: 400, publicMessage: params?.publicMessage ?? 'Datos inválidos' });
  }
}

export class UnauthorizedError extends AppError {
  constructor(params?: Omit<AppErrorParams, 'statusCode'>) {
    super({ ...params, statusCode: 401, publicMessage: params?.publicMessage ?? 'No autorizado' });
  }
}

export class ForbiddenError extends AppError {
  constructor(params?: Omit<AppErrorParams, 'statusCode'>) {
    super({ ...params, statusCode: 403, publicMessage: params?.publicMessage ?? 'Prohibido' });
  }
}
