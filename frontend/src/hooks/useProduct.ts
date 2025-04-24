import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { getAll, create } from '../services/productService';
import { useAuth } from '../stores/auth';
import { ProductRequest, ProductResponse, ProductsResponse } from '../types/apiTypes';

export const useGetAllProducts = () => {
  const { token } = useAuth();

  return useQuery<ProductsResponse, AxiosError<ProductResponse>>({
    queryKey: ['products-admin'],
    queryFn: () => getAll(token),
  });
};

export const useCreateProduct = () => {
  const { token } = useAuth();

  return useMutation<ProductResponse, AxiosError<ProductResponse>, ProductRequest>({
    mutationFn: (body) => create(body, token),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error(error.response?.data.message);
    },
  });
};
