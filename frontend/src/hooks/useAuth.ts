import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { register } from '../services/authService';
import { RegisterRequest, RegisterResponse } from '../types/apiTypes';

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
