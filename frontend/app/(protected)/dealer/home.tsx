import { router } from 'expo-router';
import { Button, Text, View } from 'react-native';
import { useAuth } from '../../../src/stores/auth';

export default function HomeScreen() {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Bienvenido Delivery</Text>
      <Button title="Cerrar sesión" onPress={handleLogout} />
    </View>
  );
}
