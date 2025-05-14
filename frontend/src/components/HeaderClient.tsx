import { Link } from 'expo-router';
import { View } from 'react-native';
import { Icon } from './Icon';

export const HeaderClient = () => {
  const user_id = 'USER_ID';

  return (
    <View className="flex-row gap-4">
      <Link href="/client/orders">
        <View className='w-10 h-10 items-center justify-center'>
          <Icon
            name="shopping-cart"
            type="MaterialIcons"
            size={32}
          />
        </View>
      </Link>

      <Link href={`/client/profile/${user_id}`}>
        <View className='w-10 h-10 items-center justify-center'>
          <Icon
            name="user"
            type="FontAwesome"
            size={32}
          />
        </View>
      </Link>
    </View>
  );
};
