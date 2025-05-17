import { useRouter } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';
import { useCartStore } from '../stores/order';
import { Icon } from './Icon';

export const HeaderClient = () => {
  const user_id = 'USER_ID';
  const router = useRouter();
  const { items } = useCartStore();

  return (
    <View className="flex-row gap-4">
      <TouchableOpacity
        onPress={() => router.push("/client/orders")}
        className="w-10 h-10 items-center justify-center"
      >
        <Icon
          name={`${items.length === 0 ? 'shopping-cart' : 'shopping-cart-checkout'}`}
          type="MaterialIcons"
          size={32}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push(`/client/profile/${user_id}`)}
        className="w-10 h-10 items-center justify-center"
      >
        <Icon
          name="user"
          type="FontAwesome"
          size={32}
        />
      </TouchableOpacity>
    </View>
  );
};
