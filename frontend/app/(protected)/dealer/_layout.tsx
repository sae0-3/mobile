import { Stack } from 'expo-router';
import colors from '../../../src/theme/colors';

export default function DealerLayout() {
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
        name="order/[id]"
        options={{
          title: 'Ruta hacia el cliente'
        }}
      />

      <Stack.Screen
        name="delivery/[id]"
        options={{
          title: 'Detalle y entrega'
        }}
      />
      <Stack.Screen
        name="detail/[id]"
        options={{
          title: 'Detalle de pedido'
        }}
      />
    </Stack>
  );
}
