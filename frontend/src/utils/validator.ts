import { z } from 'zod';

export const FloatFromString = z.preprocess((val) => {
  if (typeof val === 'string') {
    const trimmed = val.trim();
    if (trimmed === '') return undefined;

    const parsed = parseFloat(trimmed);
    return isNaN(parsed) ? undefined : parsed;
  }

  return val;
}, z.number({
  required_error: 'Campo obligatorio',
  invalid_type_error: 'Debe ser un número válido',
}).positive('Debe ser un número positivo'));

export const IntFromString = z.preprocess((val) => {
  if (typeof val === 'string') {
    const trimmed = val.trim();
    if (trimmed === '') return undefined;

    const parsed = parseInt(trimmed, 10);
    return isNaN(parsed) ? undefined : parsed;
  }

  return val;
}, z.number({
  required_error: 'Campo obligatorio',
  invalid_type_error: 'Debe ser un número entero válido',
}).int()
);
