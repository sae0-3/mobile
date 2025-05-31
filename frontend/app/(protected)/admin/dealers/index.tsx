import { router } from 'expo-router';
import { FlatList, Text, View } from 'react-native';
import { CustomButton } from '../../../../src/components/CustomButton';
import { DealerItem } from '../../../../src/components/DealerItem';
import { useGetAllDealers } from '../../../../src/hooks/useDealers';
import { Loading } from '../../../../src/components/Loading';

export default function DealersScreen() {
  const { data, isLoading, isError, error } = useGetAllDealers();
  const dealers = data?.data || [];

  const handleAdd = () => {
    router.push('/admin/dealers/add');
  }

  if (isLoading) return <Loading />;

  if (isError) {
    return <Text>Error: {error?.message}</Text>;
  }

  return (
    <FlatList
      data={dealers}
      className="w-10/12 mx-auto my-6"
      ListHeaderComponent={
        <View className="pb-4 border-b border-b-gray-300">
          <CustomButton
            title="Añadir repartidor"
            onPress={handleAdd}
            iconRight={{
              name: 'plus',
            }}
            className="p-2"
          />
        </View>
      }
      keyExtractor={(item) => item.id}
      renderItem={({ item: dealer }) => (
        <DealerItem dealer={dealer} />
      )}
    />
  );
}
