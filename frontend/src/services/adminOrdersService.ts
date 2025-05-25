import axiosInstance from '../api/axios';
import { adminOrdersEndpoints } from '../api/endpoints';
import { OrdersHistoryDealerResponse } from '../types/apiTypes';

export const getAll = async (token: string | null) => {
  const response = await axiosInstance.get<OrdersHistoryDealerResponse>(adminOrdersEndpoints.index, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
};
