import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function OrderDetailScreen() {

  const { id } = useLocalSearchParams();

  return (
    <View className="flex-1 bg-white p-4">
      <Text>MAPA</Text>
      <Text>Numero orden #{id}</Text>
    </View>
  );
}
