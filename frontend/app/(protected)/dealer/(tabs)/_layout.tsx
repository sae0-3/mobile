import { Tabs } from 'expo-router';
import { Text, View } from 'react-native';
import { Icon } from '../../../../src/components/Icon';
import { LogoutButton } from '../../../../src/components/LogoutButton';
import colors from '../../../../src/theme/colors';

export default function DealerTabsLayout() {
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
          headerTitle: () => (
            <View className="w-full flex-row justify-between items-center">
              <Text className="text-primary font-semibold text-2xl">Pedidos Disponibles</Text>
              <LogoutButton />
            </View>
          ),
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} type="Ionicons" />
          ),
        }}
      />

      <Tabs.Screen
        name="orders"
        options={{
          title: 'Pedidos',
          headerTitle: () => (
            <View className="w-full flex-row justify-between items-center">
              <Text className="text-primary font-semibold text-2xl">Pedidos Realizados</Text>
              {/* <LogoutButton /> */}
            </View>
          ),
          tabBarIcon: ({ color }) => (
            <Icon name="list" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
