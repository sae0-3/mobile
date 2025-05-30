import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { getAll, getById } from '../services/adminOrdersService';
import { useAuth } from '../stores/auth';
import { ApiResponse, OrdersHistoryAdminResponse, OrderWithDetailsAdminResponse } from '../types/apiTypes';

export const useGetHistory = () => {
  const { token } = useAuth();

  return useQuery<OrdersHistoryAdminResponse, AxiosError<ApiResponse<undefined>>>({
    queryKey: ['orders', 'admin'],
    queryFn: () => getAll(token),
  });
};

export const useGetOrderDetailsById = (id: string) => {
  const { token } = useAuth();

  return useQuery<OrderWithDetailsAdminResponse, AxiosError<ApiResponse<undefined>>>({
    queryKey: ['orders', 'admin', id],
    queryFn: () => getById(id, token),
  });
};
