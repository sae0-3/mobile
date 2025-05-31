import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { Loading } from '../../../../src/components/Loading';
import { SliderDishItem } from '../../../../src/components/SliderDishItem';
import { useGetAllCategories } from '../../../../src/hooks/useCategories';

export default function HomeScreen() {
  const { data, isLoading, isError, error } = useGetAllCategories();

  if (isLoading) return <Loading />

  if (isError) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500 italic">Error: {error.response?.data.message}</Text>
      </View>
    );
  }

  if (data?.data.length === 0) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-gray-500 italic">No se encontro información</Text>
      </View>
    );
  }

  return (
    <SafeAreaView>
      <View className="mx-auto w-11/12 py-5 gap-4">
        <ScrollView
          showsVerticalScrollIndicator={false}
          horizontal={false}
        >
          <View className="gap-6">
            {data?.data.map((categoria) => (
              <SliderDishItem
                key={categoria.id}
                id={categoria.id}
                nameCategory={categoria.name}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
