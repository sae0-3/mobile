import { Stack } from 'expo-router';
import { LogoutButton } from '../../../src/components/LogoutButton';
import colors from '../../../src/theme/colors';

export default function DealerLayout() {
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
        name="order/[id]"
        options={{
          title: 'Detalle del pedido'
        }}
      />
    </Stack>
  )
}