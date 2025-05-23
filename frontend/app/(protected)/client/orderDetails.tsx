import { useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { ProductItem } from '../../../src/components/ProductItem';
import { StatusBadge } from '../../../src/components/StatusBadge';
import { useGetByIdOrder } from '../../../src/hooks/useClientOrders';
import colors from '../../../src/theme/colors';

export default function OrderDetailsScreen() {
  const { orderId } = useLocalSearchParams();
  const { data, isLoading, error } = useGetByIdOrder(String(orderId));
  const order = data?.data;
  const created_at = new Date(String(order?.created_at));
  const updated_at = new Date(String(order?.updated_at));

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-center mt-4 text-red-500">Error al cargar el pedido</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View className="w-11/12 mx-auto py-4 gap-6">
        <StatusBadge status={order?.status || 'pending'} />

        <View className="gap-3">
          {order?.items.map((item, index) => (
            <ProductItem
              image={item.product.img_reference || ''}
              name={item.product.name}
              price={item.product.price}
              quantity={item.quantity}
              key={index}
            />
          ))}
        </View>

        <View className="flex-row gap-4 items-center justify-between p-3 bg-white rounded-lg">
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

          <Text className="text-xl font-bold text-primary italic">
            Total: {order?.total} Bs
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};
