import { useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { OrderDateFilter } from '../../../../src/components/OrderDateFilter';
import { OrderHistoryDealerItem } from '../../../../src/components/OrderHistoryDealerItem';
import { useGetHistory } from '../../../../src/hooks/useAdminOrders';
import { FilterType, useFilteredByDate } from '../../../../src/hooks/useFilter';
import colors from '../../../../src/theme/colors';

export default function OrdersScreen() {
  const { data, isLoading, isError } = useGetHistory();
  const orders = data?.data || [];

  const [selectFilter, setSelectFilter] = useState<FilterType>('Todos');
  const filteredOrders = useFilteredByDate(orders, selectFilter, 'created_at');

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>No se encontro información</Text>
      </View>
    );
  }

  return (
    <View className="bg-white">
      <FlatList
        data={filteredOrders}
        className="mx-auto w-11/12 my-6"
        keyExtractor={item => item.id}
        contentContainerStyle={{ gap: 12 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <OrderDateFilter selected={selectFilter} onChange={setSelectFilter} />
        )}
        renderItem={({ item }) => (
          <OrderHistoryDealerItem order={item} />
        )}
      />
    </View>
  );
}
