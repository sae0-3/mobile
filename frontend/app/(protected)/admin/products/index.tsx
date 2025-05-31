import { router } from 'expo-router';
import { FlatList, Text, View } from 'react-native';
import { CustomButton } from '../../../../src/components/CustomButton';
import { EditProductItem } from '../../../../src/components/EditProductItem';
import { Loading } from '../../../../src/components/Loading';
import { useGetAllProducts } from '../../../../src/hooks/useProduct';

export default function ProductsScreen() {
  const { data, isLoading, isError, error } = useGetAllProducts();
  const products = data?.data || [];

  const handleAdd = () => {
    router.push('/admin/products/add');
  }

  if (isLoading) return <Loading />;

  if (isError) {
    return <Text>Error: {error?.message}</Text>;
  }

  return (
    <FlatList
      data={products}
      className="w-10/12 mx-auto my-6"
      ListHeaderComponent={
        <View className="pb-4 border-b border-b-gray-300">
          <CustomButton
            title="Añadir producto"
            onPress={handleAdd}
            iconRight={{
              name: 'plus',
            }}
            className="p-2"
          />
        </View>
      }
      keyExtractor={(item) => item.id}
      renderItem={({ item: product }) => (
        <EditProductItem product={product} />
      )}
    />
  );
}
