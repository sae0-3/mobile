import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { create, getAll } from '../services/clientOrders';
import { useAuth } from '../stores/auth';
import { OrderRequest, OrderWithItemsResponse, OrderResponse } from '../types/apiTypes';
import { invalidateQueries } from '../utils/invalidateQueries';

export const useCreateOrder = () => {
  const { token } = useAuth();
  const queriesToInvalidate = [
    ['orders-available'],
    ['delivery-orders'],
  ];

  return useMutation<OrderResponse, AxiosError<OrderResponse>, OrderRequest>({
    mutationFn: (body) => create(body, token),
    onSuccess: (data) => {
      invalidateQueries(queriesToInvalidate);
      console.log(data);
    },
    onError: (error) => {
      console.error(error.response?.data.message);
    },
  });
};

export const useGetAllOrders = () => {
  const { token } = useAuth();

  return useQuery<OrderWithItemsResponse, AxiosError>({
    queryKey: ['orders', 'client'],
    queryFn: () => getAll(token),
  });
};