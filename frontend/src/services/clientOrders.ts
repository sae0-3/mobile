import axiosInstance from '../api/axios';
import { clientOrdersEndpoints } from '../api/endpoints';
import { OrderRequest, OrderWithItemsResponse, OrderResponse } from '../types/apiTypes';

export const create = async (body: OrderRequest, token: string | null): Promise<OrderResponse> => {
  const response = await axiosInstance.post<OrderResponse>(clientOrdersEndpoints.index, body, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
};

export const getAll = async (token: string | null): Promise<OrderWithItemsResponse> => {
  const response = await axiosInstance.get<OrderWithItemsResponse>(clientOrdersEndpoints.index, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
};