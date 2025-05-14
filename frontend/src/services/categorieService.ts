import axiosInstance from "../api/axios";
import { categoryEndpoints, productForCategoryEndpoints } from "../api/endpoints";
import { CategoryUpdateDto } from "../dtos/categoryDto";
import { CategoriesRequest, CategoriesResponse, CategoryResponse, ProductsResponse } from "../types/apiTypes";

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

export const getProductsByCategory = async (
  categoryId: string,
  token: string | null
): Promise<ProductsResponse> => {
  const response = await axiosInstance.get<ProductsResponse>(productForCategoryEndpoints.index(categoryId), {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};
