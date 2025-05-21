import { View, Text, TouchableOpacity, Linking } from 'react-native';
import { router } from 'expo-router';

import { CustomButton } from './CustomButton';
import { useConfirmDelivery } from '../hooks/useDelivery';
import { OrderDeliveryDetail } from '../types/apiTypes';
import { Icon } from './Icon';

interface Props {
  order: OrderDeliveryDetail
}

export const DetailCard = ({ order }: Props) => {
  const { mutate: confirmDelivery, isPending } = useConfirmDelivery();

  const handleConfirm = (orderId: string) => {
    confirmDelivery(orderId, {
      onSuccess: () => {
        router.push('/dealer/home')
      }
    })
  }

  const callClient = () => {
    Linking.openURL(`tel:${order.client_phone}`);
  }

  return (
    <View className="flex-1 bg-white px-4 pt-10">

      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-2xl font-extrabold text-gray-900">{order.client_name}</Text>
        <TouchableOpacity onPress={callClient}>
          <Icon name="call" size={24} color="green" type="Ionicons" />
        </TouchableOpacity>
      </View>

      <View className="bg-gray-50 rounded-2xl p-5 mb-6 shadow-sm border border-gray-200">

        <Text className="text-base font-semibold text-gray-800 mb-4">
          Detalles del pedido
          {"  "}
          <Icon name="restaurant-menu" size={18} color="#4B5563" type="MaterialIcons" />
        </Text>

        <View className="space-y-2 mb-3">
          {order.products.map((item, index) => (
            <View key={index} className="ml-4 mb-2">
              <Text className="text-gray-900 font-semibold">{item.name}</Text>
              <View className="flex-row justify-between">
                <Text className="text-gray-500">{item.quantity} unidades</Text>
                <Text className="text-gray-700 font-bold">BS. {item.subtotal}</Text>
              </View>
            </View>
          ))}
        </View>

        <View className="mt-2 px-4 py-2 bg-primary/10 rounded-xl flex-row justify-between">
          <Text className="text-gray-800 font-medium">Total</Text>
          <Text className="text-lg font-bold text-gray-700">BS. {order.total}</Text>
        </View>
      </View>

      <CustomButton
        onPress={() => handleConfirm(order.order_id)}
        loading={isPending}
        title="Confirmar Entrega"
        className="py-4 rounded-xl"
      />
    </View>
  )
}