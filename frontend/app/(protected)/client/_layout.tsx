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
        name="detail/index"
        options={{
          title: 'Detalle de producto',
        }}
      />
    </Stack>
  )
}
