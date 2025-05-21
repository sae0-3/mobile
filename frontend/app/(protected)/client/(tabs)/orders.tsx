import { Text, View, FlatList, ActivityIndicator } from 'react-native';
import { ListOrder } from '../../../../src/components/ListOrder';
import { useGetAllOrders } from '../../../../src/hooks/useClientOrders';

export default function OrdersScreen() {
  const { data, isError, isLoading, error } = useGetAllOrders();

  const pedidos = data?.data || [];

  if (isLoading) {
    return <ActivityIndicator size="large" />;
  }

  if (isError) {
    return <Text>Error: {error?.message}</Text>;
  }

  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={pedidos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ListOrder order={item} />}
        ListEmptyComponent={
          <View className="items-center justify-center mt-10">
            <Text>No hay pedidos.</Text>
          </View>
        }
        contentContainerStyle={{ paddingVertical: 16, paddingHorizontal: '5%' }}
      />
    </View>
  );
}
