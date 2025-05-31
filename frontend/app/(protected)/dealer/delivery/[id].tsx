import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';
import { DetailCard } from '../../../../src/components/DetailCard';
import { Loading } from '../../../../src/components/Loading';
import { useOrderDeliveryDetail } from '../../../../src/hooks/useDelivery';

export default function DeliveryScreen() {
  const { id } = useLocalSearchParams();
  const { data, isLoading } = useOrderDeliveryDetail(id.toString());

  const order = data?.data;

  if (isLoading) return <Loading />;

  if (!order) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Pedido no encontrado</Text>
      </View>
    );
  }
  return (
    <DetailCard
      order={order}
    />
  );
}