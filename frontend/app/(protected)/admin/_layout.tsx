import { Stack } from 'expo-router';
import { LogoutButton } from '../../../src/components/LogoutButton';

export default function AdminLayout() {
  return (
    <Stack
      screenOptions={{
        headerTintColor: '#4F46E5',
      }}
    >
      <Stack.Screen
        name="home"
        options={{
          title: 'Home',
          headerRight: () => <LogoutButton />,
        }}
      />

      <Stack.Screen
        name="products"
        options={{
          title: 'Productos',
        }}
      />
    </Stack>
  );
}
