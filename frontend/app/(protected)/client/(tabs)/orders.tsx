import { useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { Expandable } from '../../../../src/components/Expandable';
import { ListOrder } from '../../../../src/components/ListOrder';
import { OrderDateFilter } from '../../../../src/components/OrderDateFilter';
import { useGetAllOrders } from '../../../../src/hooks/useClientOrders';
import { FilterType, useFilteredByDate } from '../../../../src/hooks/useFilter';
import colors from '../../../../src/theme/colors';

export default function OrdersScreen() {
  const { data, isError, isLoading, error } = useGetAllOrders();
  const pedidos = data?.data || [];

  const [selectFilter, setSelectFilter] = useState<FilterType>('Todos');
  const filteredOrders = useFilteredByDate(pedidos, selectFilter, 'created_at');

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (isError) {
    return <Text>Error: {error?.message}</Text>;
  }

  const SECTIONS = [
    { title: 'Pendientes', key: 'pending' },
    { title: 'En progreso', key: 'in_progress' },
    { title: 'Entregados', key: 'delivered' },
    { title: 'Cancelados', key: 'cancelled' },
  ];

  const sectionsWithData = SECTIONS.map(section => ({
    ...section,
    data: filteredOrders.filter(p => p.status === section.key)
  })).filter(section => section.data.length > 0);

  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={sectionsWithData}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.key}
        className="mx-auto w-11/12 my-6"
        ListHeaderComponent={() => (
          <View className="mb-4">
            <OrderDateFilter selected={selectFilter} onChange={setSelectFilter} />
          </View>
        )}
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center">
            <Text>No hay pedidos para mostrar</Text>
          </View>
        }
        renderItem={({ item: { key, title, data } }) => (
          <Expandable key={key} title={title}>
            <View className="gap-3 mt-2">
              {data.map((item) => (
                <ListOrder key={item.id} order={item} />
              ))}
            </View>
          </Expandable>
        )}
      />
    </View>
  );
}
