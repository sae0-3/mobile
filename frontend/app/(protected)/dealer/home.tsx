import React from 'react';
import { router } from 'expo-router';

import {
  FlatList,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { useRouter } from 'expo-router'
import type { Order } from '../../../src/types/order'

const mockOrders: Order[] = [
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
          <TouchableOpacity
            className="bg-gray-100 p-4 rounded-lg mb-3"
            onPress={() => router.push(`/dealer/order/${item.id}`)}
          >
            <Text className="font-semibold mb-1">Pedido #{item.id}</Text>
            <Text>Cliente: {item.clientName}</Text>
            <Text>Direccion: {item.address}</Text>
            <Text>Telefono: {item.phone}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
