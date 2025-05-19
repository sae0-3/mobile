import { Text, TouchableOpacity, View } from 'react-native';
import { useCartStore } from '../stores/order';
import { Icon } from './Icon';

export const FooterListOrder = ({ disabled = false }) => {
  const { getTotal } = useCartStore();

  return (
    <View className="flex-row justify-between items-center">
      <Text className="text-xl font-semibold">
        Total: Bs {getTotal()}
      </Text>

      <TouchableOpacity
        disabled={disabled}
        className="border border-primary rounded-lg flex-row items-center justify-center p-2 disabled:opacity-50"
      >
        <Text className="text-primary text-lg">Continuar</Text>
        <Icon name="chevron-right" />
      </TouchableOpacity>
    </View>
  );
};
