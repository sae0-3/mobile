import { useRouter } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';
import { useCartStore } from '../stores/order';
import { Icon } from './Icon';
import { Logo } from './Logo';

export const HeaderClient = () => {
  const router = useRouter();
  const { items } = useCartStore();

  return (
    <View className="w-full flex-row justify-between">
      <Logo />

      <TouchableOpacity
        onPress={() => router.push("/client/cart")}
        className="w-10 h-10 items-center justify-center"
      >
        <Icon
          name={`${items.length === 0 ? 'shopping-cart' : 'shopping-cart-checkout'}`}
          type="MaterialIcons"
          size={36}
        />
      </TouchableOpacity>
    </View>
  );
};
