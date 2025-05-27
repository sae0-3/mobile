import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { getAll, getById } from '../services/adminOrdersService';
import { useAuth } from '../stores/auth';
import { ApiResponse, OrderCompleteDetail, OrderCompleteDetailResponse, OrderResponse, OrdersHistoryDealerResponse } from '../types/apiTypes';

export const useGetHistory = () => {
  const { token } = useAuth();

  return useQuery<OrdersHistoryDealerResponse, AxiosError<ApiResponse<undefined>>>({
    queryKey: ['orders', 'admin'],
    queryFn: () => getAll(token),
  });
};
export const useGetInfoDelivery = (id:string) => {
  const { token } = useAuth();

  return useQuery<OrderCompleteDetailResponse>({
    queryKey: ['orders', id],
    queryFn: () => getById(id,token),
  });
};
