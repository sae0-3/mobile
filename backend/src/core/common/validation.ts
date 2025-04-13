import { z } from 'zod';

export async function validateDto<T>(dto: z.ZodType<T, any, any>, data: T): Promise<void> {
  const result = dto.safeParse(data);

  if (!result.success) {
    const formattedErrors = result.error.issues
      .map(issue => `${issue.path.join('.')} - ${issue.message}`)
      .join(', ');

    throw new Error(`Datos inválidos: ${formattedErrors}`);
  }
}
