import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useAuth } from "../stores/auth";
import { create, getAll } from "../services/categorieService";
import { CategoriesRequest, CategoriesResponse, CategoryResponse } from "../types/apiTypes";

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