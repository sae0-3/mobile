import { Stack } from 'expo-router';
import { LogoutButton } from '../../../src/components/LogoutButton';
import colors from '../../../src/theme/colors';

export default function AdminLayout() {
  return (
    <Stack
      screenOptions={{
        headerTintColor: colors.primary,
      }}
    >
      <Stack.Screen
        name="home"
        options={{
          title: 'Dashboard',
          headerRight: () => <LogoutButton />,
          headerBackVisible: false,
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

      <Stack.Screen
        name="categories/index"
        options={{
          title: 'Categorías',
        }}
      />

      <Stack.Screen
        name="categories/add"
        options={{
          title: 'Agregar Categoría',
        }}
      />

      <Stack.Screen
        name="categories/[id]"
        options={{
          title: 'Editar Categoría',
        }}
      />

      <Stack.Screen
        name="dealers/index"
        options={{
          title: 'Repartidores',
        }}
      />

      <Stack.Screen
        name="dealers/add"
        options={{
          title: 'Agregar repartidor',
        }}
      />

      <Stack.Screen
        name="orders/index"
        options={{
          title: 'Lista de Pedidos',
        }}
      />
    </Stack>
  );
}
