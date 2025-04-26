import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useAuth } from "../stores/auth";
import { create, getAll, getById, update } from "../services/categorieService";
import { CategoriesRequest, CategoriesResponse, CategoryResponse } from "../types/apiTypes";
import { CategoryUpdateDto } from "../dtos/categoryDto";

export const useGetAllCategories = () => {
  const { token } = useAuth();

  return useQuery<CategoriesResponse, AxiosError<CategoriesResponse>>({
    queryKey: ['categories-admin'],
    queryFn: () => getAll(token),
  });
};

export const useCreateCategory = () => {
  const { token } = useAuth();
  return useMutation<CategoryResponse, AxiosError<CategoryResponse>, CategoriesRequest>({
    mutationFn: (body) => create(body, token),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error(error.response?.data.message);
    },
  });
};

export const useGetByIdCategory = (id: string) => {
  const { token } = useAuth();
  return useQuery<CategoryResponse, AxiosError<CategoryResponse>>({
    queryKey: ['categories', 'admin', id],
    queryFn: () => getById( id, token ),
  });
};

export const useUpdateByIdCategory = (id: string) => {
  const { token } = useAuth();
  return useMutation<CategoryResponse, AxiosError<CategoryResponse>, CategoryUpdateDto>({
    mutationFn: (body: CategoryUpdateDto) => update( id, body, token ),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error(error.response?.data.message);
    },
  });
};




