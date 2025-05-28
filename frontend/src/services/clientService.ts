import axiosInstance from '../api/axios';
import { clientEndpoints } from '../api/endpoints';
import { ClientResponse, ClientsResponse, ClientInsert } from '../types/apiTypes';

export const getAll = async (token: string | null): Promise<ClientsResponse> => {
  const response = await axiosInstance.get<ClientsResponse>(clientEndpoints.index, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const getById = async (id: string, token: string | null): Promise<ClientResponse> => {
  const response = await axiosInstance.get<ClientResponse>(`${clientEndpoints.index}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const updateById = async (id: string, body: ClientInsert, token: string | null): Promise<ClientResponse> => {
  const response = await axiosInstance.put<ClientResponse>(`${clientEndpoints.index}/${id}`, body, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
}