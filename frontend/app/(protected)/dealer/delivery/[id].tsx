import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useOrderDeliveryDetail } from '../../../../src/hooks/useDelivery';
import { DetailCard } from '../../../../src/components/DetailCard';
import colors from '../../../../src/theme/colors';


export default function DeliveryScreen() {
  const { id } = useLocalSearchParams();
  const { data, isLoading } = useOrderDeliveryDetail(id.toString());

  const order = data?.data;

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!order) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Pedido no encontrado</Text>
      </View>
    );
  }
  return (
    <DetailCard
      order={order}
    />
  );
}