import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { registerDealer } from '../services/authService';
import { getAll, remove } from '../services/dealerService';
import { useAuth } from '../stores/auth';
import { DealerRespose, DealersResponse, RegisterDealerRequest, RegisterDealerResponse } from '../types/apiTypes';
import { invalidateQueries } from '../utils/invalidateQueries';

export const useGetAllDealers = () => {
  const { token } = useAuth();

  return useQuery<DealersResponse, AxiosError<DealersResponse>>({
    queryKey: ['dealers', 'admin'],
    queryFn: () => getAll(token),
  });
};

export const useCreateDealer = () => {
  const { token } = useAuth();
  const queriesToInvalidate = [
    ['dealers', 'admin'],
  ];

  return useMutation<RegisterDealerResponse, AxiosError<RegisterDealerResponse>, RegisterDealerRequest>({
    mutationFn: (body) => registerDealer(body, token),
    onSuccess: (data) => {
      invalidateQueries(queriesToInvalidate);
      console.log(data);
    },
    onError: (error) => {
      console.error(error.response?.data.message);
    },
  });
};

export const useDeleteDealer = (id: string) => {
  const { token } = useAuth();
  const queriesToInvalidate = [
    ['dealers', 'admin'],
  ];

  return useMutation<void, AxiosError<DealerRespose>>({
    mutationFn: () => remove(id, token),
    onSuccess: () => {
      invalidateQueries(queriesToInvalidate);
    },
    onError: (error) => {
      console.error(error.response?.data.message);
    },
  });
};
