import { Response } from 'express';
import { ControllerResponse } from '../types/controller-response.type';

export const responseBuilder = (
  res: Response,
  options: {
    success?: boolean;
    statusCode: number;
    data?: unknown;
    message?: string;
  }
) => {
  const { success = true, ...rest } = options
  const response: ControllerResponse<typeof rest.data> = {
    ...rest,
    success
  };

  return res.status(options.statusCode).json(response);
};
