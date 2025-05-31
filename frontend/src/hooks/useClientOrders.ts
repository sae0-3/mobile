import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { create, getAll, getById } from '../services/clientOrdersService';
import { useAuth } from '../stores/auth';
import { ApiResponse, OrderRequest, OrderResponse, OrdersHistoryClientResponse, OrderWithDetailsClientResponse } from '../types/apiTypes';
import { invalidateQueries } from '../utils/invalidateQueries';

export const useCreateOrder = () => {
  const { token } = useAuth();
  const queriesToInvalidate = [
    ['orders-available'],
    ['delivery-orders'],
    ['orders', 'client'],
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

  return useQuery<OrdersHistoryClientResponse, AxiosError<ApiResponse<undefined>>>({
    queryKey: ['orders', 'client'],
    queryFn: () => getAll(token),
  });
};

export const useGetByIdOrder = (id: string) => {
  const { token } = useAuth();

  return useQuery<OrderWithDetailsClientResponse, AxiosError<ApiResponse<undefined>>>({
    queryKey: ['orders', id],
    queryFn: () => getById(id, token),
  });
};
