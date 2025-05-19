import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { create, getAll, remove } from '../services/locationService';
import { useAuth } from '../stores/auth';
import { LocationRequest, LocationResponse, LocationsResponse } from '../types/apiTypes';
import { invalidateQueries } from '../utils/invalidateQueries';

export const useGetAllLocations = () => {
  const { id, token } = useAuth();

  return useQuery<LocationsResponse, AxiosError<LocationsResponse>>({
    queryKey: ['locations', id],
    queryFn: () => getAll(token),
  });
};

export const useCreateLocation = () => {
  const { id, token } = useAuth();
  const queriesToInvalidate = [
    ['locations', id],
  ];

  return useMutation<LocationResponse, AxiosError<LocationResponse>, LocationRequest>({
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

export const useDeleteLocation = () => {
  const { id, token } = useAuth();
  const queriesToInvalidate = [
    ['locations', id],
  ];

  return useMutation<void, AxiosError<LocationResponse>, string>({
    mutationFn: (id) => remove(id, token),
    onSuccess: () => {
      invalidateQueries(queriesToInvalidate);
      console.log('Se elimino la ubicación');
    },
    onError: (error) => {
      console.error(error.response?.data.message);
    },
  });
};
