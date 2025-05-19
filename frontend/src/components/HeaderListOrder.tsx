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
        className="border border-primary rounded-lg items-center justify-center w-12 aspect-square"
      >
        <Icon name="restore" type="MaterialCommunityIcons" />
      </TouchableOpacity>
    </View>
  );
};
