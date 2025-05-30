import axiosInstance from '../api/axios';
import { adminOrdersEndpoints, infoDealerOrderEndpoints } from '../api/endpoints';
import { OrderWithDetailsAdminResponse, OrdersHistoryAdminResponse } from '../types/apiTypes';

export const getAll = async (token: string | null) => {
  const response = await axiosInstance.get<OrdersHistoryAdminResponse>(adminOrdersEndpoints.index, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
};

export const getById = async (id: string, token: string | null) => {
  const response = await axiosInstance.get<OrderWithDetailsAdminResponse>(infoDealerOrderEndpoints.index(id), {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
};
