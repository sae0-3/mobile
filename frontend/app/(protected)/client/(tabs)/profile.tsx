import { Text, View } from 'react-native';
import { LogoutButton } from '../../../../src/components/LogoutButton';

export default function ProfileScreen() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text>Información del usuario</Text>

      <LogoutButton />
    </View>
  );
}
