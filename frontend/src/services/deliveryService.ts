import axiosInstance from "../api/axios";
import { deliveryEndpoints } from "../api/endpoints";
import { DeliveryResponse, OrderDeliveryDetailResponse, OrderLocationResponse, OrdersHistoryDealerResponse, OrderWithDetailsDealerResponse, UpdatedOrderResponse } from "../types/apiTypes";

export const getAll = async (token: string | null): Promise<DeliveryResponse> => {
  const response = await axiosInstance.get<DeliveryResponse>(deliveryEndpoints.index, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
}

export const accepOrder = async (orderId: string, token: string | null): Promise<UpdatedOrderResponse> => {
  const response = await axiosInstance.patch<UpdatedOrderResponse>(`${deliveryEndpoints.index}/${orderId}/accept`, {}, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data
}

export const getOrderLocation = async (orderId: string, token: string | null): Promise<OrderLocationResponse> => {
  const response = await axiosInstance.get<OrderLocationResponse>(`${deliveryEndpoints.index}/${orderId}/location`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
}

export const orderDeliveryDetail = async (orderId: string, token: string | null): Promise<OrderDeliveryDetailResponse> => {
  const response = await axiosInstance.get<OrderDeliveryDetailResponse>(`${deliveryEndpoints.index}/${orderId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data;
}

export const confirmDelivery = async (orderId: string, token: string | null): Promise<UpdatedOrderResponse> => {
  const response = await axiosInstance.patch<UpdatedOrderResponse>(`${deliveryEndpoints.index}/${orderId}`, {}, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data
}

export const getHistory = async (token: string | null) => {
  const response = await axiosInstance.get<OrdersHistoryDealerResponse>(`${deliveryEndpoints.index}/history`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
};

export const getOrderFromHistoryById = async (id: string, token: string | null) => {
  const response = await axiosInstance.get<OrderWithDetailsDealerResponse>(`${deliveryEndpoints.index}/history/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
};
