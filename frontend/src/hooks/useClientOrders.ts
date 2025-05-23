import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { create, getAll } from '../services/clientOrders';
import { useAuth } from '../stores/auth';
import { OrderRequest, OrderWithItemsResponse, OrderResponse, OrderWithItemResponse } from '../types/apiTypes';
import { invalidateQueries } from '../utils/invalidateQueries';
import { getById } from '../services/clientOrders';

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

  return useQuery<OrderWithItemsResponse, AxiosError>({
    queryKey: ['orders', 'client'],
    queryFn: () => getAll(token),
  });
};

export const useGetByIdOrder = (id: string) => {
  const { token } = useAuth();

  return useQuery<OrderWithItemResponse, AxiosError>({
    queryKey: ['orders', id],
    queryFn: () => getById(id, token),
  });
};
