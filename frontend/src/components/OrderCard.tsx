import { View, Text, Alert } from 'react-native';
import { Delivery } from '../types/apiTypes';
import { Icon } from './Icon';
import { CustomButton } from './CustomButton';
import { useRouter } from 'expo-router';
import { useAcceptOrder } from '../hooks/useDelivery';

interface Props {
  order: Delivery;
}

export const OrderCard = ({ order }: Props) => {
  const router = useRouter();
  const { mutate: acceptOrder, isPending } = useAcceptOrder();
  const handleAccept = (orderId: string) => {
    acceptOrder(orderId, {
      onSuccess: () => {
        router.push(`/dealer/order/${orderId}`);
      },
      onError: () => {
        Alert.alert('Erro', 'No se pudo aceptar el pedido');
      },
    })
  }
  return (
    <View className="bg-white rounded-2xl p-5 mb-4 shadow-md border border-gray-200">

      <View className="flex-row items-center mb-1">
        <Icon name="person" type="Ionicons" size={18} color="gray" />
        <Text className="ml-2 text-gray-800">{order.client_name}</Text>
      </View>

      <View className="flex-row items-center mb-1">
        <Icon name="location-on" type="MaterialIcons" size={18} color="gray" />
        <Text className="ml-2 text-gray-700">{order.client_address}</Text>
      </View>

      <View className="flex-row items-center mb-1">
        <Icon name="call" type="Ionicons" size={18} color="gray" />
        <Text className="ml-2 text-gray-700">{order.client_phone}</Text>
      </View>

      <CustomButton
        className="py-3 rounded-xl"
        onPress={() => handleAccept(order.order_id)}
        disabled={isPending}
        loading={isPending}
        title='Aceptar pedido'
      />
    </View>
  )
}