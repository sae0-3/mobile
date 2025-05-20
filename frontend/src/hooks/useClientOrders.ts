import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { create } from '../services/clientOrders';
import { useAuth } from '../stores/auth';
import { OrderRequest, OrderResponse } from '../types/apiTypes';
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
