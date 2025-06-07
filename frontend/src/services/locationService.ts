import axiosInstance from '../api/axios';
import { locationEnpoints } from '../api/endpoints';
import { LocationRequest, LocationResponse, LocationsResponse } from '../types/apiTypes';

export const getAll = async (token: string | null): Promise<LocationsResponse> => {
  const response = await axiosInstance.get<LocationsResponse>(locationEnpoints.index, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const create = async (body: LocationRequest, token: string | null): Promise<LocationResponse> => {
  const response = await axiosInstance.post<LocationResponse>(locationEnpoints.index, body, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const remove = async (location_id: string, token: string | null): Promise<void> => {
  const response = await axiosInstance.delete(`${locationEnpoints.index}/${location_id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};
