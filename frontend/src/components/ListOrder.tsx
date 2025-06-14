import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useCancelOrderById } from '../hooks/useClientOrders';
import { OrderHistoryClient } from '../types/api/orders.types';
import { ConfirmModal } from './ConfirmModal';
import { CustomButton } from './CustomButton';

export const ListOrder = ({ order }: { order: OrderHistoryClient }) => {
  const [showModal, setShowModal] = useState(false);
  const orderDate = new Date(order.created_at);
  const formattedDate = orderDate.toLocaleDateString();
  const router = useRouter();
  const { mutate } = useCancelOrderById();

  const handleCancelOrder = () => {
    mutate(order.id);
    setShowModal(false);
  };

  return (
    <View
      className="border-b border-b-gray-300 rounded flex-row justify-between py-3 px-4 items-center"
    >
      <View className="gap-1">
        <Text className="font-bold">{formattedDate}</Text>

        <View className="flex-row items-center opacity-65">
          <Text className='text-center italic'>Bs. </Text>
          <Text>{order.total}</Text>
        </View>
      </View>

      {showModal && (
        <ConfirmModal
          visible={showModal}
          title="Cancelar pedido"
          message="¿Estás seguro de que deseas cancelar este pedido?"
          onConfirm={() => handleCancelOrder()}
          onCancel={() => setShowModal(false)}
        />
      )}

      <View className="flex-row gap-2">
        {order.status === "pending" &&
          <Pressable
            className="bg-red-400 p-3 rounded-md items-center justify-center"
            onPress={() => setShowModal(true)}
          >
            <Text className="text-white font-medium">Cancelar</Text>
          </Pressable>
        }

        <CustomButton
          onPress={() => {
            {
              router.push({
                pathname: '/client/orderDetails',
                params: { orderId: order.id }
              });
            }
          }}
          iconRight={{
            name: 'eye',
            size: 30,
          }}
          className="p-2"
        />
      </View>
    </View>
  );
};
