import { Tabs } from 'expo-router';
import { House } from 'lucide-react-native';

export default function TabsLayout() {
  const customSize = 60;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#380c82',
        tabBarInactiveTintColor: '#94a3b8',
        tabBarLabelPosition: 'beside-icon',
        tabBarStyle: {
          height: customSize,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <House
              color={color}
              size={customSize - 20}
            />
          ),
        }}
      />
    </Tabs>
  );
}
