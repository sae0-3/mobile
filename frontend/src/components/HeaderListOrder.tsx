import { Text, TouchableOpacity, View } from 'react-native';
import { useCartStore } from '../stores/order';
import { Icon } from './Icon';

export const HeaderListOrder = () => {
  const { clearCart } = useCartStore();

  return (
    <View className="flex-row justify-between items-center">
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
