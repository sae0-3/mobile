import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useAuth } from "../stores/auth";
import { create, getAll, getProductsByCategory } from "../services/categorieService";
import { CategoriesRequest, CategoriesResponse, CategoryResponse, ProductsResponse } from "../types/apiTypes";

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


export const useProductForCategory = (categoryId: string) => {
  const { token } = useAuth();
  return useQuery<ProductsResponse, AxiosError<ProductsResponse>>({
    queryKey: ['products-by-category', categoryId],
    queryFn: () => getProductsByCategory(categoryId,token),
    enabled: !!categoryId,
  });
};