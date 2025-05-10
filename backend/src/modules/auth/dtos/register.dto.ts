import { z } from 'zod';

import { CreateAdminDto } from '../../users/dtos/admin.dto';
import { CreateClientDto } from '../../users/dtos/client.dto';
import { CreateDealerDto } from '../../users/dtos/dealer.dto';

export const RegisterDto = z.object({
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
      'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial'
    ),
});

export const RegisterClientDto = CreateClientDto.extend(RegisterDto.shape);
export type RegisterClientDto = z.infer<typeof RegisterClientDto>;

export const RegisterDealerDto = CreateDealerDto.extend(RegisterDto.shape);
export type RegisterDealerDto = z.infer<typeof RegisterDealerDto>;

export const RegisterAdminDto = CreateAdminDto.extend(RegisterDto.shape);
export type RegisterAdminDto = z.infer<typeof RegisterAdminDto>;
