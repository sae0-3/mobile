import axiosInstance from '../api/axios';
import { authEndpoints } from '../api/endpoints';
import {
  LoginRequest,
  LoginResponse,
  RegisterDealerRequest,
  RegisterDealerResponse,
  RegisterRequest,
  RegisterResponse,
} from '../types/apiTypes';

export const register = async (data: RegisterRequest): Promise<RegisterResponse> => {
  const response = await axiosInstance.post<RegisterResponse>(authEndpoints.register, data);
  return response.data;
};

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await axiosInstance.post<LoginResponse>(authEndpoints.login, data);
  return response.data;
};

export const registerDealer = async (data: RegisterDealerRequest, token: string | null): Promise<RegisterDealerResponse> => {
  const response = await axiosInstance.post<RegisterDealerResponse>(`${authEndpoints.register}/dealer`, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};
