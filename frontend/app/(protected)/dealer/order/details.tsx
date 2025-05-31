import { useLocalSearchParams } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import { Icon } from '../../../../src/components/Icon';
import { Loading } from '../../../../src/components/Loading';
import { StatusBadge } from '../../../../src/components/StatusBadge';
import { useGetOrderFromsHistoryById } from '../../../../src/hooks/useDelivery';

export default function OrderDetailsScreen() {
  const { id } = useLocalSearchParams();
  const { data, isError, isLoading } = useGetOrderFromsHistoryById(String(id));
  const order = data?.data;
  const created_at = new Date(String(order?.created_at));
  const updated_at = new Date(String(order?.updated_at));

  if (isLoading) return <Loading />;

  if (isError) {
    return (
      <Text>Error al cargar la orden</Text>
    );
  }

  if (!order) {
    return (
      <Text>No se encontró la orden</Text>
    );
  }

  return (
    <ScrollView>
      <View className="w-11/12 mx-auto py-5 gap-5">
        <View className="bg-white rounded-xl shadow-md shadow-black p-2 items-end">
          <StatusBadge status={order.status} />
        </View>

        <View className="bg-white rounded-xl shadow-md shadow-black px-2 py-4">
          <Text className="text-lg font-bold text-center pb-2 mb-3 border-b border-b-gray-200">Información del Cliente</Text>

          <View className="flex-row  gap-4">
            <Icon name="person-circle" type="Ionicons" size={70} />

            <View className="gap-2 flex-1">
              <View className="flex-row gap-1 flex-wrap">
                <Text className="font-semibold">Nombre:</Text>
                <Text className="text-base">{order.client.name}</Text>
              </View>

              <View className="flex-row gap-1 flex-wrap">
                <Text className="font-semibold">Correo Electrónico:</Text>
                <Text className="text-base">{order.client.email}</Text>
              </View>

              <View className="flex-row gap-1 flex-wrap">
                <Text className="font-semibold">Telefono:</Text>
                <Text className="text-base">{order.client.phone}</Text>
              </View>

              <View className="flex-row gap-1 flex-wrap">
                <Text className="font-semibold">Ubicación:</Text>
                <Text className="text-base">{order.location.address}</Text>
              </View>
            </View>
          </View>
        </View>

        <View className="bg-white rounded-xl shadow-md shadow-black px-3 py-4">
          <Text className="text-lg font-bold text-center pb-2 mb-3 border-b border-b-gray-200">Productos</Text>

          <View className="gap-2">
            {order.items.map((item, index) => (
              <View key={index} className="flex-row justify-between gap-3">
                <Text className="text-sm flex-1">
                  {item.product?.name}
                </Text>
                <Text className="text-sm font-medium">
                  x{item.quantity} — Bs {item.subtotal}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View className="flex-row bg-white rounded-xl shadow-md shadow-black px-3 py-4 gap-4 justify-between items-center">
          <View className="flex-1 gap-1">
            <View>
              <Text className="font-semibold text-sm">Creado el:</Text>
              <Text className="text-sm">
                {created_at.toLocaleDateString('es-ES', { dateStyle: 'full' })
                }, {created_at.toLocaleTimeString('es-ES', { timeStyle: 'short' })}
              </Text>
            </View>

            <View>
              <Text className="font-semibold text-sm">Ultima actualización:</Text>
              <Text className="text-sm">
                {updated_at.toLocaleDateString('es-ES', { dateStyle: 'full' })
                }, {updated_at.toLocaleTimeString('es-ES', { timeStyle: 'short' })}
              </Text>
            </View>
          </View>

          <Text className="text-lg font-semibold">Total: Bs {order.total}</Text>
        </View>
      </View>
    </ScrollView>
  );
}
