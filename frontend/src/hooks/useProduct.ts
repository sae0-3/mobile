import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ProductUpdateDto } from '../dtos/productDto';
import { create, getAll, getById, updateById } from '../services/productService';
import { useAuth } from '../stores/auth';
import { ProductRequest, ProductResponse, ProductsResponse } from '../types/apiTypes';
import { invalidateQueries } from '../utils/invalidateQueries';

export const useGetAllProducts = () => {
  const { token } = useAuth();

  return useQuery<ProductsResponse, AxiosError<ProductResponse>>({
    queryKey: ['products', 'admin'],
    queryFn: () => getAll(token),
  });
};

export const useCreateProduct = () => {
  const { token } = useAuth();
  const queriesToInvalidate = [
    ['products', 'admin'],
  ];

  return useMutation<ProductResponse, AxiosError<ProductResponse>, ProductRequest>({
    mutationFn: (body) => create(body, token),
    onSuccess: (data) => {
      invalidateQueries(queriesToInvalidate);
      console.log(data);
    },
    onError: (error) => {
      console.error(error.response?.data.message);
    },
  });
};

export const useGetByIdProduct = (id: string) => {
  const { token } = useAuth();

  return useQuery<ProductResponse, AxiosError<ProductResponse>>({
    queryKey: ['product', 'admin', id],
    queryFn: () => getById(id, token),
  });
};

export const useUpdateByIdProduct = (id: string) => {
  const { token } = useAuth();
  const queriesToInvalidate = [
    ['product', 'admin', id],
    ['products', 'admin'],
  ];

  return useMutation<ProductResponse, AxiosError<ProductResponse>, ProductUpdateDto>({
    mutationFn: (body: ProductUpdateDto) => updateById(id, body, token),
    onSuccess: (data) => {
      invalidateQueries(queriesToInvalidate);
      console.log(data);
    },
    onError: (error) => {
      console.error(error.response?.data.message);
    },
  });
};
