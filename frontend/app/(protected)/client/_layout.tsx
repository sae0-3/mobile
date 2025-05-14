import { Stack } from 'expo-router';
import { HeaderClient } from '../../../src/components/HeaderClient';
import { Logo } from '../../../src/components/Logo';
import colors from '../../../src/theme/colors';

export default function ClientLayout() {
  return (
    <Stack
      screenOptions={{
        headerTintColor: colors.primary,
      }}
    >
      <Stack.Screen
        name="home"
        options={{
          headerTitle: () => <Logo />,
          headerRight: () => <HeaderClient />,
          headerBackVisible: false,
        }}
      />

      <Stack.Screen
        name="profile/[id]"
        options={{
          title: 'Información del usuario',
        }}
      />

      <Stack.Screen
        name="orders/index"
        options={{
          title: 'Realizar Pedido',
        }}
      />
    </Stack>
  )
}
