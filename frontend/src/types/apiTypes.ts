export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message?: string;
  data: T;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name?: string;
}

export type RegisterResponse = ApiResponse<{
  id: string;
  access_token: string;
}>;
