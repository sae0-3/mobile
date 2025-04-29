import { router } from 'expo-router';
import { FlatList } from 'react-native';
import { DashboardTile } from '../../../src/components/DashboardTile';

const tiles = [
  {
    icon: 'package',
    title: 'Productos',
    onPress: () => router.push('/admin/products'),
  },
  {
    icon: 'grid',
    title: 'Categorías',
    onPress: () => router.push('/admin/categories'),
  },
  {
    icon: 'users',
    title: 'Repartidores',
    onPress: () => { },
  },
  // {
  //   icon: 'archive',
  //   title: 'Sucursales',
  //   onPress: () => { },
  // },
];

export default function HomeScreen() {
  return (
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
  );
}
