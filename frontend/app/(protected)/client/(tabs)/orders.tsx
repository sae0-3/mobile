import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { Expandable } from '../../../../src/components/Expandable';
import { ListOrder } from '../../../../src/components/ListOrder';
import { useGetAllOrders } from '../../../../src/hooks/useClientOrders';
import colors from '../../../../src/theme/colors';
import { useState } from 'react';
import { CustomButton } from '../../../../src/components/CustomButton';
import { filterOrderByDate, FilterType } from '../../../../src/utils/orderFilter';

export default function OrdersScreen() {
  const { data, isError, isLoading, error } = useGetAllOrders();
  const pedidos = data?.data || [];

  const [selectFilter, setSelectFilter] = useState<FilterType>('Todos');

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

  const OPTIONS: FilterType[] = [
    'Todos', 'Hoy', 'Semana', 'Mes'
  ]

  return (
    <ScrollView className="flex-1 px-4 py-3">
      <View className="flex-row justify-around mb-4 flex-wrap gap-2">
        {OPTIONS.map((selected) => (
          <CustomButton
            key={selected}
            title={selected}
            onPress={() => setSelectFilter(selected)}
            className="py-1 px-3"
          />
        ))}
      </View>

      {SECTIONS.map(({ title, key }) => {
        const porEstado = pedidos.filter((p) => p.status === key);
        const filtered = filterOrderByDate(porEstado, selectFilter);

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
    </ScrollView>
  );
}
