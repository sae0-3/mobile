import { Text, TouchableOpacity, View } from 'react-native';
import { useCartStore } from '../stores/order';
import { Icon } from './Icon';

export const HeaderListOrder = () => {
  const { clearCart } = useCartStore();

  return (
    <View className="pb-4 flex-row justify-between items-center border-b border-b-gray-200">
      <Text className="font-bold text-2xl">
        Lista de productos
      </Text>

      <TouchableOpacity
        onPress={() => clearCart()}
        className="bg-primary p-2 rounded-lg"
      >
        <Icon name="restore" color="white" type="MaterialCommunityIcons" />
      </TouchableOpacity>
    </View>
  );
};
