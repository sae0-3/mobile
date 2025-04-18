import axiosInstance from '../api/axios';
import { authEndpoints } from '../api/endpoints';
import { RegisterRequest, RegisterResponse } from '../types/apiTypes';

export const register = async (data: RegisterRequest): Promise<RegisterResponse> => {
  const response = await axiosInstance.post<RegisterResponse>(authEndpoints.register, data);
  return response.data;
};
