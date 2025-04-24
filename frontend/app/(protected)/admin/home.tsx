import { router } from 'expo-router';
import { LayoutGrid, Package, Store, Users } from 'lucide-react-native';
import { FlatList, View } from 'react-native';
import { DashboardTile } from '../../../src/components/DashboardTile';

const tiles = [
  {
    icon: { Icon: Package },
    title: 'Productos',
    onPress: () => router.push('/admin/products'),
  },
  {
    icon: { Icon: LayoutGrid },
    title: 'Categorías',
    onPress: () => { },
  },
  {
    icon: { Icon: Users },
    title: 'Repartidores',
    onPress: () => { },
  },
  {
    icon: { Icon: Store },
    title: 'Sucursales',
    onPress: () => { },
  },
];

export default function HomeScreen() {
  return (
    <View>
      <FlatList
        data={tiles}
        keyExtractor={({ title }) => title}
        numColumns={1}
        renderItem={({ item }) => (
          <DashboardTile
            icon={item.icon}
            title={item.title}
            onPress={item.onPress}
          />
        )}
        contentContainerStyle={{
          padding: 12,
          alignItems: 'center',
        }}
      />
    </View>
  );
}
