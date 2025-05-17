import axiosInstance from "../api/axios";
import { deliveryEndpoints } from "../api/endpoints";
import { DeliveryResponse, OrderDeliveryDetailResponse, UpdatedOrderResponse } from "../types/apiTypes";

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
