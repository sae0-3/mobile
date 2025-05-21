import { Text, View, ActivityIndicator, ScrollView } from 'react-native';
import { ListOrder } from '../../../../src/components/ListOrder';
import { useGetAllOrders } from '../../../../src/hooks/useClientOrders';
import { Expandable } from '../../../../src/components/Expandable'; // Asegúrate que la ruta sea correcta

export default function OrdersScreen() {
  const { data, isError, isLoading, error } = useGetAllOrders();
  const pedidos = data?.data || [];

  if (isLoading) {
    return <ActivityIndicator size="large" />;
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
    <ScrollView className="flex-1 bg-white px-4 py-2">
      {SECTIONS.map(({ title, key }) => {
        const filtered = pedidos.filter((p) => p.status === key);

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
