import axiosInstance from '../api/axios';
import { dealerEndpoints, dealerOrderEndpoints } from '../api/endpoints';
import { DealerRespose, DealersDetailResponse, DealersResponse } from '../types/apiTypes';

export const getAll = async (token: string | null): Promise<DealersResponse> => {
  const response = await axiosInstance.get<DealersResponse>(dealerEndpoints.index, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const remove = async (id: string, token: string | null): Promise<void> => {
  await axiosInstance.delete(`${dealerEndpoints.index}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const getById = async (id: string,token: string | null): Promise<DealersDetailResponse> => {
  const response = await axiosInstance.get<DealersDetailResponse>(dealerOrderEndpoints.index(id), {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
};