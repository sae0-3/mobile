import React from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons'
import { useConfirmDelivery, useOrderDeliveryDetail } from '../../../../src/hooks/useDelivery';


export default function DeliveryScreen() {
  const { id } = useLocalSearchParams();
  const { data, isLoading } = useOrderDeliveryDetail(id.toString());
  const { mutate: confirmDelivery, isPending } = useConfirmDelivery();
  const router = useRouter();

  const order = data?.data;

  console.log(order);
  if (!order) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Pedido no encontrado</Text>
      </View>
    );
  }
  const callClient = () => {
    Linking.openURL(`tel:${order.client_phone}`);
  }

  const handleConfirm = (orderId: string) => {
    confirmDelivery(orderId, {
      onSuccess: () => {
        router.push('/dealer/home')
      }
    })
  }

  return (
    <View className="flex-1 bg-white px-4 pt-10">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-2xl font-bold">{order.client_name}</Text>
        <TouchableOpacity onPress={callClient}>
          <Ionicons name="call" size={28} color="green" />
        </TouchableOpacity>
      </View>

      <View className="bg-white rounded-2xl p-5 mb-6 shadow-md border border-gray-200">
        <Text className="text-lg font-semibold mb-3">Detalles del pedido</Text>

        <View className="flex-row items-center mb-2">
          <Entypo name="location-pin" size={20} color="#000" />
          <Text className="ml-2 text-gray-700">{order.address}</Text>
        </View>
        <View className="flex-row items-center mb-1">
          <MaterialIcons name="restaurant-menu" size={20} color="#000" />
          <Text className="ml-2 text-gray-700">Productos:</Text>
        </View>
        <Text className="ml-8 text-gray-600">{order.product_name}</Text>
      </View>

      <TouchableOpacity
        onPress={() => handleConfirm(order.order_id)}
        className="bg-primary py-4 rounded-xl items-center"
        activeOpacity={0.8}
      >
        <Text className="text-white font-bold text-lg">
          {isPending ? 'Confirmando...' : 'Confirmar entrega'}
        </Text>
      </TouchableOpacity>
    </View>
  )
}