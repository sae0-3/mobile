import React from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native'
import { useGetAllOrders } from '../../../src/hooks/useDelivery';
import { OrderCard } from '../../../src/components/OrderCard';

export default function HomeScreen() {
  const { data, isLoading, isError, error } = useGetAllOrders();

  const orders = data?.data || [];

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#000" />
      </View>
    )
  }

  if (isError) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-black font-semibold">{error.message}</Text>
      </View>
    )
  }

  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={orders}
        keyExtractor={o => o.order_id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <OrderCard
            order={item}
          />
        )}
      />
    </View>
  );
}
