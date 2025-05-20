import { Stack } from 'expo-router';
import colors from '../../../src/theme/colors';

export default function ClientLayout() {
  return (
    <Stack
      screenOptions={{
        headerTintColor: colors.primary,
      }}
    >
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="cart"
        options={{
          title: 'Realizar Pedido',
        }}
      />

      <Stack.Screen
        name="detail"
        options={{
          title: 'Detalles del producto',
        }}
      />
    </Stack>
  )
}
