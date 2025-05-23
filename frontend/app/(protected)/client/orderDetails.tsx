import { useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { ProductItem } from '../../../src/components/ProductItem';
import StatusBadge from '../../../src/components/StatusBadge';
import { useGetByIdOrder } from '../../../src/hooks/useClientOrders';
import colors from '../../../src/theme/colors';

export default function OrderDetailsScreen() {
  const { orderId } = useLocalSearchParams();
  const { data, isLoading, error } = useGetByIdOrder(String(orderId));
  const order = data?.data;

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-center mt-4 text-red-500">Error al cargar el pedido</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white px-4 py-6">
      <View className="mb-6">
        <Text className="text-lg font-semibold text-primary mb-4">Total: {order?.total} Bs</Text>

        <StatusBadge status={order?.status || 'pending'} />
      </View>

      {order?.items.map((items, index) => (
        <ProductItem imagen={items.product.img_reference || ''} name={items.product.name} price={items.product.price} cantidad={items.quantity} key={index} />
      ))}
    </ScrollView>
  );
};
