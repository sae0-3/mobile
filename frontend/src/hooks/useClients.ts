import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { getAll, getById, updateById } from '../services/clientService';
import { useAuth } from '../stores/auth';
import { ClientInsert, ClientResponse, ClientsResponse } from '../types/apiTypes';
import { invalidateQueries } from '../utils/invalidateQueries';

export const useGetAllClients = () => {
  const { token } = useAuth();

  return useQuery<ClientsResponse, AxiosError<ClientsResponse>>({
    queryKey: ['clients'],
    queryFn: () => getAll(token),
  });
};

export const useGetByIdClient = (id: string) => {
  const { token } = useAuth();

  return useQuery<ClientResponse, AxiosError<ClientResponse>>({
    queryKey: ['clients', id],
    queryFn: () => getById(id, token),
  });
};

export const useUpdateByIdClient = (id: string) => {
  const { token } = useAuth()
  const queriesToInvalidate = [
    ['clients', id],
    ['clients'],
  ];

  return useMutation<ClientResponse, AxiosError<ClientResponse>, ClientInsert>({
    mutationFn: (body) => updateById(id, body, token),
    onSuccess: (data) => {
      invalidateQueries(queriesToInvalidate);
      console.log(data);
    },
    onError: (error) => {
      console.error(error.response?.data.message);
    }
  })
}