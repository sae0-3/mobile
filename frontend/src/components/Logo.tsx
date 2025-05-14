import { Link } from 'expo-router';
import { Text, View } from 'react-native';
import { Rescue } from '../../assets/Rescue';

export const Logo = () => {
  return (
    <Link href="/client">
      <View className="flex-row gap-1 items-center">
        <Rescue width={30} height={30} />
        <Text className="font-extrabold text-primary text-xl">
          Rescue Food
        </Text>
      </View>
    </Link>
  );
};
