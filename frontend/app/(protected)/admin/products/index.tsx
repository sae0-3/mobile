import { router } from 'expo-router';
import { Plus } from 'lucide-react-native';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { CustomButton } from '../../../../src/components/CustomButton';
import { useGetAllProducts } from '../../../../src/hooks/useProduct';

export default function ProductsScreen() {
  const { data, isLoading, isError, error } = useGetAllProducts();
  const products = data?.data || [];

  const handleAdd = () => {
    router.push('/admin/products/add');
  }

  if (isLoading) {
    return <ActivityIndicator size="large" />;
  }

  if (isError) {
    return <Text>Error: {error?.message}</Text>;
  }

  return (
    <View className="flex gap-4 mt-4">
      <CustomButton
        title="Añadir producto"
        onPress={handleAdd}
        icon={{ Icon: Plus }}
        className="w-10/12 mx-auto"
      />

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="p-4 border-t border-[#ccc]">
            <Text className="text-lg">{item.name}</Text>
            <Text className="text-lg text-gray-400">${item.price}</Text>
          </View>
        )}
      />
    </View>
  );
}
