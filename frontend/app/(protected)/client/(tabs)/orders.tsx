import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { Expandable } from '../../../../src/components/Expandable';
import { ListOrder } from '../../../../src/components/ListOrder';
import { useGetAllOrders } from '../../../../src/hooks/useClientOrders';
import colors from '../../../../src/theme/colors';
import { useState } from 'react';
import { useFilteredOrders, FilterType } from '../../../../src/hooks/useFilter';
import { OrderDateFilter } from '../../../../src/components/OrderDateFilter';

export default function OrdersScreen() {
  const { data, isError, isLoading, error } = useGetAllOrders();
  const pedidos = data?.data || [];

  const [selectFilter, setSelectFilter] = useState<FilterType>('Todos');
  const filteredOrders = useFilteredOrders(pedidos, selectFilter);

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

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View className="w-11/12 mx-auto pt-6 pb-4 gap-6">
        <OrderDateFilter selected={selectFilter} onChange={setSelectFilter} />

        <View>
          {SECTIONS.map(({ title, key }) => {
            const filtered = filteredOrders.filter((p) => p.status === key);
            if (filtered.length === 0) return null;

            return (
              <Expandable key={key} title={title}>
                <View className="gap-3 mt-2">
                  {filtered.map((item) => (
                    <ListOrder key={item.id} order={item} />
                  ))}
                </View>
              </Expandable>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}
