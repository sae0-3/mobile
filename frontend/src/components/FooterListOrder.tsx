import { Text, TouchableOpacity, View } from 'react-native';
import { useCartStore } from '../stores/order';
import { Icon } from './Icon';

type FooterListOrderProps = {
  disabled: boolean;
  handleContinue: () => void;
};

export const FooterListOrder = (props: FooterListOrderProps) => {
  const { getTotal } = useCartStore();

  return (
    <View className="flex-row justify-between items-center">
      <Text className="text-xl font-semibold">
        Total: Bs {getTotal()}
      </Text>

      <TouchableOpacity
        onPress={props.handleContinue}
        disabled={props.disabled}
        className="border border-primary rounded-lg flex-row items-center justify-center p-2 disabled:opacity-40"
      >
        <Text className="text-primary text-lg">Continuar</Text>
        <Icon name="chevron-right" />
      </TouchableOpacity>
    </View>
  );
};
