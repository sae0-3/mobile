import { z } from 'zod';

import { CreateAdminDto } from '../../users/dtos/admin.dto';
import { CreateClientDto } from '../../users/dtos/client.dto';
import { CreateDealerDto } from '../../users/dtos/dealer.dto';

export const RegisterSchema = z.object({
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
      'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial'
    ),
});

export const RegisterGoogleSchema = z.object({
  provider_user_id: z
    .string(),
});

export const RegisterClientSchema = CreateClientDto.extend(RegisterSchema.shape);
export const RegisterDealerSchema = CreateDealerDto.extend(RegisterSchema.shape);
export const RegisterAdminSchema = CreateAdminDto.extend(RegisterSchema.shape);
export const RegisterClientGoogleSchema = CreateClientDto.extend(RegisterGoogleSchema.shape);

export type RegisterClientDto = z.infer<typeof RegisterClientSchema>;
export type RegisterDealerDto = z.infer<typeof RegisterDealerSchema>;
export type RegisterAdminDto = z.infer<typeof RegisterAdminSchema>;
export type RegisterClientGoogleDto = z.infer<typeof RegisterClientGoogleSchema>;
