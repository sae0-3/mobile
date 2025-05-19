import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { getAll, getById } from '../services/clientService';
import { useAuth } from '../stores/auth';
import { ClientResponse, ClientsResponse } from '../types/apiTypes';

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
