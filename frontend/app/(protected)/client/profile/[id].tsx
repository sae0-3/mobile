import { Text, View } from 'react-native';
import { LogoutButton } from '../../../../src/components/LogoutButton';

export default function EditProductScreen() {
  return (
    <View className="flex-1 justify-center items-center gap-5">
      <Text>Informacion del Usuario</Text>
      <LogoutButton />
    </View>
  );
}
