import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { OrderHistoryDealerItem } from '../../../../src/components/OrderHistoryDealerItem';
import colors from '../../../../src/theme/colors';
import { useGetHistory } from '../../../../src/hooks/useAdminOrders';

export default function OrdersScreen() {
  const { data, isLoading, isError } = useGetHistory();

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

  if (isError || !data) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>No se encontro información</Text>
      </View>
    );
  }

  const orders = data.data;

  return (
    <View className="bg-white">
      <FlatList
        data={orders}
        className="mx-auto w-11/12 my-6"
        keyExtractor={item => item.id}
        contentContainerStyle={{ gap: 12 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <OrderHistoryDealerItem order={item} />
        )}
      />
    </View>
  );
}
