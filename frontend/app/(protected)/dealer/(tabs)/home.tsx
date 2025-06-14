import { FlatList, Text, View } from 'react-native';
import { Loading } from '../../../../src/components/Loading';
import { OrderCard } from '../../../../src/components/OrderCard';
import { useGetAllOrders } from '../../../../src/hooks/useDelivery';

export default function HomeScreen() {
  const { data, isLoading, isError, error } = useGetAllOrders();
  const orders = data?.data || [];

  if (isLoading) return <Loading />;

  if (isError) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-black font-semibold">{error.message}</Text>
      </View>
    )
  }

  if (orders?.length === 0) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>No existen pedidos disponibles</Text>
      </View>
    );
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
