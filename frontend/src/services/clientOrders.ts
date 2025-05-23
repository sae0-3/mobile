import axiosInstance from '../api/axios';
import { clientOrderEndpoints, clientOrdersEndpoints } from '../api/endpoints';
import { OrderRequest, OrderWithItemsResponse, OrderResponse, OrderWithItemResponse } from '../types/apiTypes';

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

export const getById = async (id: string,token: string | null): Promise<OrderWithItemResponse> => {
  const response = await axiosInstance.get<OrderWithItemResponse>(clientOrderEndpoints.index(id), {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
};