import { Text, View } from 'react-native';
import { OrderWithItems, Product } from '../types/apiTypes';
import { CustomButton } from './CustomButton';
import { Icon } from './Icon';

export const ListOrder = ({ order }: { order: OrderWithItems }) => {
  const orderDate = new Date(order.created_at);
  const formattedDate = orderDate.toLocaleDateString()
  return (
    <View
      className="border-b border-b-gray-300 rounded flex-row justify-between py-3 items-center"
    >
      <View className="gap-1">
        <Text className="font-bold">{formattedDate}</Text>

        <View className="flex-row items-center opacity-65">
          <Text className='text-center italic'>Bs. </Text>
          <Text>{order.total}</Text>
        </View>
      </View>
      <View className="flex-row gap-2">
        {order.status === "cancelled" &&
          <CustomButton
            onPress={() => { }}
            iconRight={{
              name: 'trash',
              size: 30,
            }}
            className="p-2 bg-red-500"
          />
        }
        <CustomButton
          onPress={() => { }}
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
