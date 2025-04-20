import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { login, register } from '../services/authService';
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '../types/apiTypes';

export const useRegister = () => {
  return useMutation<RegisterResponse, AxiosError<RegisterResponse>, RegisterRequest>({
    mutationFn: register,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error(error.response?.data.message);
    },
  });
};

export const useLogin = () => {
  return useMutation<LoginResponse, AxiosError<LoginResponse>, LoginRequest>({
    mutationFn: login,
    onSuccess: (data) => {
      console.log("success: ", data)
    },
    onError: (error) => {
      console.error("error: ", error.response?.data.message)
    },
  })
}
