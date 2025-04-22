import axiosInstance from '../api/axios';
import { productEnpoints } from '../api/endpoints';
import { ProductRequest, ProductsResponse } from '../types/apiTypes';

export const getAll = async (token: string | null): Promise<ProductsResponse> => {
  const response = await axiosInstance.get<ProductsResponse>(productEnpoints.index, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const create = async (body: ProductRequest, token: string | null): Promise<ProductsResponse> => {
  const response = await axiosInstance.post<ProductsResponse>(productEnpoints.index, body, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};
