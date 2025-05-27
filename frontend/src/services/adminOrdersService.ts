import axiosInstance from '../api/axios';
import { adminOrdersEndpoints, infoDealerOrderEndpoints } from '../api/endpoints';
import { OrderCompleteDetail, OrderCompleteDetailResponse, OrderResponse, OrdersHistoryDealerResponse } from '../types/apiTypes';

export const getAll = async (token: string | null) => {
  const response = await axiosInstance.get<OrdersHistoryDealerResponse>(adminOrdersEndpoints.index, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
};
export const getById = async (id: string,token: string | null) => {
  const response = await axiosInstance.get<OrderCompleteDetailResponse>(infoDealerOrderEndpoints.index(id), {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
};