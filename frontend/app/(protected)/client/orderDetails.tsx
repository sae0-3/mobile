import { useLocalSearchParams } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import { Loading } from '../../../src/components/Loading';
import { ProductItem } from '../../../src/components/ProductItem';
import { StatusBadge } from '../../../src/components/StatusBadge';
import { useGetByIdOrder } from '../../../src/hooks/useClientOrders';

export default function OrderDetailsScreen() {
  const { orderId } = useLocalSearchParams();
  const { data, isLoading, error } = useGetByIdOrder(String(orderId));
  const order = data?.data;
  const created_at = new Date(String(order?.created_at));
  const updated_at = new Date(String(order?.updated_at));

  if (isLoading) return <Loading />;

  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-center mt-4 text-red-500">Error al cargar el pedido</Text>
      </View>
    );
  }

  if (!order) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-center mt-4 text-red-500">No hay informacion del pedido</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View className="w-11/12 mx-auto py-5 gap-5">
        <View className="bg-white rounded-xl shadow-md shadow-black p-2 items-end">
          <StatusBadge status={order.status} />
        </View>

        <View className="bg-white rounded-xl shadow-md shadow-black px-3 py-4">
          <Text className="text-lg font-bold text-center pb-2 mb-3 border-b border-b-gray-200">Productos</Text>

          <View className="gap-3">
            {order.items.map(item => (
              <ProductItem
                key={item.id}
                name={item.product?.name || 'Sin información'}
                image={item.product?.img_reference || ''}
                quantity={item.quantity}
                subtotal={item.subtotal}
              />
            ))}
          </View>
        </View>

        <View className="flex-row bg-white rounded-xl shadow-md shadow-black px-3 py-4 gap-1 justify-between items-center flex-wrap">
          <Text className="font-semibold">Enviado a:</Text>
          <Text>{order.location.address}</Text>
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
