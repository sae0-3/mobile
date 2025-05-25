import { Stack } from 'expo-router';
import colors from '../../../src/theme/colors';
import { Cart } from '../../../src/components/Cart';

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
        name="productDetails"
        options={{
          title: 'Detalles del producto',
          headerRight: () => <Cart />,
        }}
      />

      <Stack.Screen
        name="orderDetails"
        options={{
          title: 'Detalle de pedido',
          headerRight: () => <Cart />,
        }}
      />
    </Stack>
  )
}
