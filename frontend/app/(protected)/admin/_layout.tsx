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
          title: 'Inicio',
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
    </Stack>
  );
}
