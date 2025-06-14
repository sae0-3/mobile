import { Text, TouchableOpacity, View } from 'react-native';
import { OrderHistoryDealer } from '../types/api/orders.types';
import { StatusBadge } from './StatusBadge';

interface OrderHistoryItemProps {
  order: OrderHistoryDealer;
  handleViewDetails: () => void;
}

export const OrderHistoryDealerItem = (props: OrderHistoryItemProps) => {
  const { order, handleViewDetails } = props;

  return (
    <View className="w-full py-4 px-5 rounded-2xl bg-white shadow-md border border-gray-200 gap-3">
      <View className="flex-row items-center gap-2">
        <View className="flex-1 gap-px">
          <Text className="font-medium">
            {order.location.address}
          </Text>

          <Text className="text-sm">
            {new Date(order.updated_at).toLocaleDateString('es-ES', { dateStyle: 'full' })}
          </Text>
        </View>

        <StatusBadge status={order.status} />
      </View>

      <TouchableOpacity
        onPress={() => handleViewDetails()}
        className="items-center justify-center px-4 py-3 bg-primary rounded-xl"
      >
        <Text className="text-white">Ver detalles</Text>
      </TouchableOpacity>
    </View >
  );
};
