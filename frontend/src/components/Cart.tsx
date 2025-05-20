import { useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { useCartStore } from '../stores/order';
import { Icon } from './Icon';

export const Cart = () => {
  const router = useRouter();
  const { items } = useCartStore();

  return (
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
  );
};
