import axiosInstance from '../api/axios';
import { productEnpoints } from '../api/endpoints';
import { ProductUpdateDto } from '../dtos/productDto';
import { ApiResponse, CategoriesResponse, ProductRequest, ProductResponse, ProductsResponse } from '../types/apiTypes';

export const getAll = async (token: string | null): Promise<ProductsResponse> => {
  const response = await axiosInstance.get<ProductsResponse>(productEnpoints.index, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const create = async (body: ProductRequest, token: string | null): Promise<ProductResponse> => {
  const response = await axiosInstance.post<ProductResponse>(productEnpoints.index, body, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const getById = async (id: string, token: string | null): Promise<ProductResponse> => {
  const response = await axiosInstance.get<ProductResponse>(`${productEnpoints.index}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const updateById = async (id: string, body: ProductUpdateDto, token: string | null): Promise<ProductResponse> => {
  const response = await axiosInstance.put<ProductResponse>(`${productEnpoints.index}/${id}`, body, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const getCategoriesLinkedById = async (id: string, token: string | null): Promise<CategoriesResponse> => {
  const response = await axiosInstance.get<CategoriesResponse>(`${productEnpoints.index}/${id}/categories`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const getCategoriesUnlinkedById = async (id: string, token: string | null): Promise<CategoriesResponse> => {
  const response = await axiosInstance.get<CategoriesResponse>(`${productEnpoints.index}/${id}/categories?linked=false`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const linkToCategory = async (
  product_id: string,
  category_id: string,
  token: string | null
): Promise<ApiResponse<undefined>> => {
  const response = await axiosInstance.post<ApiResponse<undefined>>(
    `${productEnpoints.index}/${product_id}/categories/${category_id}`, null, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const unlinkToCategory = async (
  product_id: string,
  category_id: string,
  token: string | null
): Promise<ApiResponse<undefined>> => {
  const response = await axiosInstance.delete<ApiResponse<undefined>>(
    `${productEnpoints.index}/${product_id}/categories/${category_id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};
