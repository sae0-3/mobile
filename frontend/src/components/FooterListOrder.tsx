import { Text, TouchableOpacity, View } from 'react-native';
import { useCartStore } from '../stores/order';
import { Icon } from './Icon';

export const FooterListOrder = () => {
  const { getTotal } = useCartStore();

  return (
    <View className="pt-4 flex-row justify-between items-center border-t border-t-gray-200">
      <Text className="text-xl font-semibold">
        Total: Bs {getTotal()}
      </Text>

      <TouchableOpacity
        className="bg-primary rounded-lg flex-row items-center justify-center p-2"
      >
        <Text className="text-white text-lg">Continuar</Text>
        <Icon name="chevron-right" color="white" />
      </TouchableOpacity>
    </View>
  );
};
