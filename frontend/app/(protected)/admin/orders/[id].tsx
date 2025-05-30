import { useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { useGetOrderDetailsById } from '../../../../src/hooks/useAdminOrders';
import colors from '../../../../src/theme/colors';

export default function OrderDetailsAdmin() {
  const { id } = useLocalSearchParams();
  const { data, isLoading, isError } = useGetOrderDetailsById(String(id));
  const details = data?.data;

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

  if (isError) {
    return (
      <Text className="mt-32 text-center text-base text-red-600">Error al cargar la orden</Text>
    );
  }

  if (!details) {
    return (
      <Text className="mt-32 text-center text-base text-red-600">No se encontró la orden</Text>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      {details.dealer && (
        <View className="bg-white rounded-xl p-4 mb-4 shadow-md">
          <Text className="text-lg font-bold mb-2">Repartidor</Text>

          <View className="flex-row mb-1">
            <Text className="w-24 font-semibold">Nombre:</Text>
            <Text className="flex-1">{details.dealer.name}</Text>
          </View>

          <View className="flex-row mb-1">
            <Text className="w-24 font-semibold">Vehículo:</Text>
            <Text className="flex-1">{details.dealer.vehicle}</Text>
          </View>

          <View className="flex-row">
            <Text className="w-24 font-semibold">Email:</Text>
            <Text className="flex-1">{details.dealer.email}</Text>
          </View>
        </View>
      )}

      <View className="bg-white rounded-xl p-4 mb-4 shadow-md">
        <Text className="text-lg font-bold mb-2">Cliente</Text>

        <View className="flex-row mb-1">
          <Text className="w-24 font-semibold">Nombre:</Text>
          <Text className="flex-1">{details.client.name}</Text>
        </View>

        <View className="flex-row mb-1">
          <Text className="w-24 font-semibold">Teléfono:</Text>
          <Text className="flex-1">{details.client.phone}</Text>
        </View>

        <View className="flex-row mb-1">
          <Text className="w-24 font-semibold">Ubicación:</Text>
          <Text className="flex-1">{details.location.address}</Text>
        </View>

        <View className="flex-row">
          <Text className="w-24 font-semibold">Email:</Text>
          <Text className="flex-1">{details.client.email}</Text>
        </View>
      </View>

      <View className="bg-white rounded-xl p-4 mb-4 shadow-md">
        <Text className="text-lg font-bold mb-2">Productos</Text>

        {details.items.map((p) => (
          <View
            key={p.id}
            className="flex-row justify-between py-1 border-b border-gray-200 last:border-b-0"
          >
            <Text className="flex-1">{p.product?.name}</Text>
            <Text className="w-10 text-center">x{p.quantity}</Text>
            <Text className="w-20 text-right font-semibold">Bs {p.subtotal}</Text>
          </View>
        ))}
      </View>

      <View className="bg-white rounded-xl px-4 py-2 shadow-md">
        <Text className="text-xl font-extrabold text-right">Total: Bs {details.total}</Text>
      </View>
    </ScrollView>
  );
}
