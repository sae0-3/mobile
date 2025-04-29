import axiosInstance from "../api/axios";
import { categoryEndpoints } from "../api/endpoints";
import { CategoriesResponse, CategoryResponse, CategoriesRequest } from "../types/apiTypes";
import { CategoryUpdateDto } from "../dtos/categoryDto";

export const getAll = async (token: string | null): Promise<CategoriesResponse> => {
  const response = await axiosInstance.get<CategoriesResponse>(categoryEndpoints.index, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const create = async (body: CategoriesRequest, token: string | null): Promise<CategoryResponse> => {
  const response = await axiosInstance.post<CategoryResponse>(categoryEndpoints.index, body, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const getById = async (id: string, token: string | null): Promise<CategoryResponse> => {
  const response = await axiosInstance.get<CategoryResponse>(`${categoryEndpoints.index}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const update = async (id: string, body: CategoryUpdateDto, token: string | null): Promise<CategoryResponse> => {
  const response = await axiosInstance.put<CategoryResponse>(`${categoryEndpoints.index}/${id}`, body, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};