import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useGetByIdOrder } from '../../../src/hooks/useClientOrders';

export default function DetailPedido() {
  const { orderId } = useLocalSearchParams();
  const { data, isLoading, error } = useGetByIdOrder(String(orderId));
  const order = data?.data;

  if (isLoading) return <Text className="text-center mt-4">Cargando...</Text>;
  if (error) return <Text className="text-center mt-4 text-red-500">Error al cargar el pedido</Text>;

  return (
    <ScrollView className="flex-1 bg-white px-4 py-6">
      <View className="mb-6">
        {/* Encabezado del pedido */}
        <Text className="text-lg font-semibold text-primary mb-4">
          Total: {order?.total} Bs
        </Text>

        {/* Estado del pedido */}
        <View className="flex-row items-center p-3 bg-gray-50 rounded-xl shadow-sm">
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/190/190411.png' }}
            className="w-10 h-10 mr-4"
          />
          <View>
            <Text className="text-sm text-gray-500">Estado</Text>
            <Text className="text-base font-semibold text-gray-800">
              {order?.status || 'Procesando'}
            </Text>
          </View>
        </View>
      </View>


      {/* Lista de productos */}
      {order?.items.map((item, index) => (
        <View
          key={index}
          className="flex-row items-center justify-between p-4 mb-4 bg-white rounded-2xl shadow-md"
        >
          <Image
            src={item.product.img_reference}
            className="w-16 h-16 rounded-xl bg-gray-200 mr-5"
          />
          <View className="flex-1">
            <Text className="text-lg font-semibold text-gray-900">
              {item.product.name}
            </Text>
            <Text className="text-base text-gray-600">
              {item.product.price} Bs
            </Text>
          </View>
          <Text className="text-base font-bold text-gray-800">
            x {item.quantity}
          </Text>
        </View>
      ))}


      {/* Detalle de entrega */}
      <Text className="text-lg font-semibold mt-6 mb-2">Detalle de entrega</Text>
      <View className="flex-row items-center">
        <Image className="w-8 h-8 mr-3" />
        <Text className="text-base font-medium">Delivery</Text>
      </View>
    </ScrollView>
  );
}
