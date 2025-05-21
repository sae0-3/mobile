import { View } from 'react-native';
import { Cart } from './Cart';
import { Logo } from './Logo';

export const HeaderClient = () => {
  return (
    <View className="w-full flex-row justify-between">
      <Logo />

      <Cart />
    </View>
  );
};
