import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { useGetInfoDelivery } from '../../../../src/hooks/useAdminOrders';

export default function DetailAdmin() {
  const { id } = useLocalSearchParams();
  const { data, error, isLoading } = useGetInfoDelivery(id?.toString?.() ?? '');
  const orders = data?.data;

  /* Estados de carga / error */
  if (!id || typeof id !== 'string')
    return <Text className="mt-32 text-center text-base text-red-600">ID inválido</Text>;
  if (isLoading) return <ActivityIndicator className="flex-1 justify-center items-center" size="large" />;
  if (error) return <Text className="mt-32 text-center text-base text-red-600">Error al cargar la orden</Text>;
  if (!orders) return <Text className="mt-32 text-center text-base text-red-600">No se encontró la orden</Text>;

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      {/* Repartidor */}
      <View className="bg-white rounded-xl p-4 mb-4 shadow-md">
        <Text className="text-lg font-bold mb-2">Repartidor</Text>
        <View className="flex-row mb-1">
          <Text className="w-24 font-semibold">Nombre:</Text>
          <Text className="flex-1">{orders.dealer.name}</Text>
        </View>
        <View className="flex-row mb-1">
          <Text className="w-24 font-semibold">Vehículo:</Text>
          <Text className="flex-1">{orders.dealer.vehicle}</Text>
        </View>
        <View className="flex-row">
          <Text className="w-24 font-semibold">Email:</Text>
          <Text className="flex-1">{orders.dealer.email}</Text>
        </View>
      </View>

      {/* Cliente */}
      <View className="bg-white rounded-xl p-4 mb-4 shadow-md">
        <Text className="text-lg font-bold mb-2">Cliente</Text>
        <View className="flex-row mb-1">
          <Text className="w-24 font-semibold">Nombre:</Text>
          <Text className="flex-1">{orders.client.name}</Text>
        </View>
        <View className="flex-row mb-1">
          <Text className="w-24 font-semibold">Teléfono:</Text>
          <Text className="flex-1">{orders.client.phone}</Text>
        </View>
        <View className="flex-row mb-1">
          <Text className="w-24 font-semibold">Ubicación:</Text>
          <Text className="flex-1">{orders.location.address}</Text>
        </View>
        <View className="flex-row">
          <Text className="w-24 font-semibold">Email:</Text>
          <Text className="flex-1">{orders.client.email}</Text>
        </View>
      </View>

      {/* Productos */}
      <View className="bg-white rounded-xl p-4 mb-4 shadow-md">
        <Text className="text-lg font-bold mb-2">Productos</Text>
        {orders.items.map((p) => (
          <View
            key={p.id ?? p.product.id}
            className="flex-row justify-between py-1 border-b border-gray-200 last:border-b-0"
          >
            <Text className="flex-1">{p.product.name}</Text>
            <Text className="w-10 text-center">x{p.quantity}</Text>
            <Text className="w-20 text-right font-semibold">Bs {p.product.price}</Text>
          </View>
        ))}
      </View>

      {/* Total */}
      <View className="bg-white rounded-xl px-4 py-2 shadow-md">
        <Text className="text-xl font-extrabold text-right">Total: Bs {orders.total}</Text>
      </View>
    </ScrollView>
  );
}
