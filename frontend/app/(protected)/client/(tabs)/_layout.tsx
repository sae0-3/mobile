import { Tabs } from 'expo-router';
import { HeaderClient } from '../../../../src/components/HeaderClient';
import { Icon } from '../../../../src/components/Icon';
import colors from '../../../../src/theme/colors';

export default function ClientTabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        headerTintColor: colors.primary,
        tabBarStyle: {
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Inicio',
          headerTitle: () => <HeaderClient />,
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} type="Ionicons" />
          ),
        }}
      />

      <Tabs.Screen
        name="orders"
        options={{
          title: 'Pedidos',
          tabBarIcon: ({ color }) => (
            <Icon name="list" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => (
            <Icon name="user" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
