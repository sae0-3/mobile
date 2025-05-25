import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { getAll } from '../services/adminOrdersService';
import { useAuth } from '../stores/auth';
import { ApiResponse, OrdersHistoryDealerResponse } from '../types/apiTypes';

export const useGetHistory = () => {
  const { token } = useAuth();

  return useQuery<OrdersHistoryDealerResponse, AxiosError<ApiResponse<undefined>>>({
    queryKey: ['orders', 'admin'],
    queryFn: () => getAll(token),
  });
};
