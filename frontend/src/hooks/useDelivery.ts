import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { accepOrder, confirmDelivery, getAll, getHistory, getOrderFromHistoryById, getOrderLocation, orderDeliveryDetail } from '../services/deliveryService';
import { useAuth } from '../stores/auth';
import { ApiResponse, DeliveryResponse, OrderDeliveryDetailResponse, OrderLocationResponse, OrdersHistoryDealerResponse, OrderWithDetailsDealerResponse, UpdatedOrderResponse } from '../types/apiTypes';
import { invalidateQueries } from '../utils/invalidateQueries';

export const useGetAllOrders = () => {
  const { token } = useAuth();
  return useQuery<DeliveryResponse, AxiosError<DeliveryResponse>>({
    queryKey: ['delivery-orders'],
    queryFn: () => getAll(token),
  });
}

export const useAcceptOrder = () => {
  const { token, id } = useAuth();
  const queriesToInvalidate = [
    ['delivery-orders'],
    ['orders', 'history', id]
  ];

  return useMutation<UpdatedOrderResponse, AxiosError<UpdatedOrderResponse>, string>({
    mutationFn: (orderId: string) => accepOrder(orderId, token),
    onSuccess: () => {
      invalidateQueries(queriesToInvalidate)
    },
    onError: (error) => {
      console.error(error.response?.data.message);
    },
  });
}

export const useOrderLocation = (orderId: string) => {
  const { token } = useAuth();

  return useQuery<OrderLocationResponse, AxiosError<OrderLocationResponse>>({
    queryKey: ['order-location', orderId],
    queryFn: () => getOrderLocation(orderId, token),
    enabled: !!orderId
  })
}

export const useOrderDeliveryDetail = (orderId: string) => {
  const { token } = useAuth();

  return useQuery<OrderDeliveryDetailResponse, AxiosError<OrderDeliveryDetailResponse>>({
    queryKey: ['orderDelivery', orderId],
    queryFn: async () => orderDeliveryDetail(orderId, token),
    enabled: !!orderId,
  });
}

export const useConfirmDelivery = () => {
  const { token } = useAuth();
  const queriesToInvalidate = [
    ['orders-available']
  ];

  return useMutation<UpdatedOrderResponse, AxiosError<UpdatedOrderResponse>, string>({
    mutationFn: (orderId: string) => confirmDelivery(orderId, token),
    onSuccess: () => {
      invalidateQueries(queriesToInvalidate)
    },
    onError: (error) => {
      console.error(error.response?.data.message);
    },
  });
}

export const useGetHistory = () => {
  const { token, id } = useAuth();

  return useQuery<OrdersHistoryDealerResponse, AxiosError<OrdersHistoryDealerResponse>>({
    queryKey: ['orders', 'history', id],
    queryFn: () => getHistory(token),
  });
};

export const useGetOrderFromsHistoryById = (id: string) => {
  const { token } = useAuth();

  return useQuery<OrderWithDetailsDealerResponse, AxiosError<ApiResponse<undefined>>>({
    queryKey: ['orders', 'history', 'dealer', id],
    queryFn: () => getOrderFromHistoryById(id, token),
    enabled: !!id,
  });
};
