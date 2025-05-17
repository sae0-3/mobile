import React from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { useRouter } from 'expo-router'
import { useAcceptOrder, useGetAllOrders } from '../../../src/hooks/useDelivery';

export default function HomeScreen() {
  const router = useRouter();
  const { data, isLoading, isError, error } = useGetAllOrders();
  const { mutate: acceptOrder, isPending } = useAcceptOrder();

  const orders = data?.data || [];

  if (isLoading) {
    return (
      <ActivityIndicator size="large" color="#000" />
    )
  }

  if (isError) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-black font-semibold">{error.message}</Text>
      </View>
    )
  }

  const handleAccept = (orderId: string) => {
    acceptOrder(orderId, {
      onSuccess: () => {
        router.push(`/dealer/order/${orderId}`);
      },
      onError: () => {
        Alert.alert('Erro', 'No se pudo aceptar el pedido');
      },
    })
  }

  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={orders}
        keyExtractor={o => o.order_id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View className="bg-white rounded-2xl p-5 mb-6 shadow-md border border-gray-200">
            <Text className="text-lg font-semibold text-gray-800 mb-2">Pedido</Text>
            <Text className="ml-2 text-gray-700">{item.client_name}</Text>
            <Text className="ml-2 text-gray-700">{item.client_address}</Text>
            <Text className="ml-2 text-gray-700">{item.client_phone}</Text>
            <Text className="ml-2 text-gray-700">Total: Bs. {item.totol}</Text>

            <TouchableOpacity
              className="bg-primary py-2 rounded-xl items-center mt-3"
              onPress={() => handleAccept(item.order_id)}
            >
              <Text className="text-white font-bold text-lg">
                {isPending ? 'Aceptando...' : 'Aceptar'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
