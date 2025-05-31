import axiosInstance from '../api/axios';
import { clientOrderEndpoints, clientOrdersEndpoints } from '../api/endpoints';
import { OrderRequest, OrderResponse, OrdersHistoryClientResponse, OrderWithDetailsClientResponse } from '../types/apiTypes';

export const create = async (body: OrderRequest, token: string | null) => {
  const response = await axiosInstance.post<OrderResponse>(clientOrdersEndpoints.index, body, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
};

export const getAll = async (token: string | null) => {
  const response = await axiosInstance.get<OrdersHistoryClientResponse>(clientOrdersEndpoints.index, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
};

export const getById = async (id: string, token: string | null) => {
  const response = await axiosInstance.get<OrderWithDetailsClientResponse>(clientOrderEndpoints.index(id), {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
};

export const cancelById = async (id: string, token: string | null) => {
  const response = await axiosInstance.patch<OrderResponse>(clientOrderEndpoints.index(id), {}, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
};
