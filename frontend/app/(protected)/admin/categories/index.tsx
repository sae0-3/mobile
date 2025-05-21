import { router } from 'expo-router';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { CustomButton } from '../../../../src/components/CustomButton';
import { EditCategoryItem } from '../../../../src/components/EditCategoryItem';
import { useGetAllCategories } from '../../../../src/hooks/useCategories';

export default function CategoriesScreen() {
  const { data, isLoading, isError, error } = useGetAllCategories();
  const categories = data?.data || [];

  const handleAdd = () => {
    router.push('/admin/categories/add');
  }

  if (isLoading) {
    return <ActivityIndicator size="large" />;
  }

  if (isError) {
    return <Text>Error: {error?.message}</Text>;
  }

  return (
    <FlatList
      data={categories}
      className="w-10/12 mx-auto my-6"
      ListHeaderComponent={
        <View className="pb-4 border-b border-b-gray-300">
          <CustomButton
            title="Añadir Categoría"
            onPress={handleAdd}
            iconRight={{
              name: 'plus'
            }}
            className="p-2"
          />
        </View>
      }
      keyExtractor={(item) => item.id}
      renderItem={({ item: category }) => (
        <EditCategoryItem category={category} />
      )}
    />
  );
}
