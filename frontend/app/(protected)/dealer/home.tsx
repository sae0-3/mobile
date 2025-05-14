import React from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { useRouter } from 'expo-router'
import type { OrderBase } from '../../../src/types/apiTypes'

const mockOrders: OrderBase[] = [
  { id: '1', clientName: 'Juan Perez', address: 'Av. san Martin 123', items: ['Pizza', 'Ensalada'], phone: 72165841 },
  { id: '2', clientName: 'Maria Lopez', address: 'Calle Falsa 456', items: ['Hamburguesa', 'Papas fritas'], phone: 75415695 },
]

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={mockOrders}
        keyExtractor={o => o.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View className="bg-white rounded-2xl p-5 mb-6 shadow-md border border-gray-200">
            <Text className="text-lg font-semibold text-gray-800 mb-2">Pedido #{item.id}</Text>
            <Text className="ml-2 text-gray-700">{item.clientName}</Text>
            <Text className="ml-2 text-gray-700">{item.address}</Text>
            <Text className="ml-2 text-gray-700">{item.phone}</Text>

            <TouchableOpacity
              className="bg-primary py-2 rounded-xl items-center mt-3"
              onPress={() => router.push(`/dealer/order/${item.id}`)}
            >
              <Text className="text-white font-bold text-lg">Aceptar</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
