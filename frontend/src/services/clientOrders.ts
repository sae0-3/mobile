import axiosInstance from '../api/axios';
import { clientOrdersEndpoints } from '../api/endpoints';
import { OrderRequest, OrderResponse } from '../types/apiTypes';

export const create = async (body: OrderRequest, token: string | null): Promise<OrderResponse> => {
  const response = await axiosInstance.post<OrderResponse>(clientOrdersEndpoints.index, body, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
};
