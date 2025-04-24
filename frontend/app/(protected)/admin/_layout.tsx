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
        name="products/index"
        options={{
          title: 'Productos',
        }}
      />

      <Stack.Screen
        name="products/add"
        options={{
          title: 'Agregar Producto',
        }}
      />

      <Stack.Screen
        name="products/[id]"
        options={{
          title: 'Editar Producto',
        }}
      />
    </Stack>
  );
}
