import React from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons'
import { OrderBase } from '../../../../src/types/apiTypes';

const mockOrders: OrderBase[] = [
  { id: '1', clientName: 'Juan Perez', address: 'Av. san Martin 123', items: ['Pizza', 'Ensalada'], phone: 72165841 },
  { id: '2', clientName: 'Maria Lopez', address: 'Calle Falsa 456', items: ['Hamburguesa', 'Papas fritas'], phone: 75415695 },
];

export default function DeliveryScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const order = mockOrders.find(o => o.id === id);

  if (!order) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Pedido no encontrado</Text>
      </View>
    );
  }
  const callClient = () => {
    Linking.openURL(`tel:${order.phone}`);
  }

  return (
    <View className="flex-1 bg-white px-4 pt-10">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-2xl font-bold">{order.clientName}</Text>
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
        {order.items.map((item, index) => (
          <Text key={index} className="ml-8 text-gray-600">{item}</Text>
        ))}
      </View>

      <TouchableOpacity
        onPress={() => {
          console.log('Confirmar entrega');
          router.push('/dealer/home')
        }}
        className="bg-primary py-4 rounded-xl items-center"
        activeOpacity={0.8}
      >
        <Text className="text-white font-bold text-lg">Confirmar entrega</Text>
      </TouchableOpacity>
    </View>
  )
}