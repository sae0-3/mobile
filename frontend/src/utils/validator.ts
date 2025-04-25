import { ZodObject, ZodRawShape } from 'zod';

export const validateField = <T extends ZodRawShape>(
  schema: ZodObject<T>,
  fieldName: keyof T,
  value: unknown
): string => {
  const fieldSchema = schema.shape[fieldName];
  const result = fieldSchema.safeParse(value);
  if (!result.success) {
    return result.error.errors[0].message;
  }
  return '';
};

export const makeZodValidator = <T extends ZodRawShape>(
  schema: ZodObject<T>,
  fieldName: keyof T
) => {
  return (value: unknown) => validateField(schema, fieldName, value);
};
