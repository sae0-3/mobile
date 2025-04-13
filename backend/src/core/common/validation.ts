import { z } from 'zod';
import { ValidationError } from '../errors/app.error';

export async function validateDto<T>(dto: z.ZodType<T, any, any>, data: T): Promise<void> {
  const result = dto.safeParse(data);

  if (!result.success) {
    const formattedErrors = result.error.issues
      .map(issue => `${issue.path.join('.')} - ${issue.message}`)
      .join(', ');

    throw new ValidationError({
      internalMessage: `Datos inválidos: ${formattedErrors}`,
    });
  }
}
