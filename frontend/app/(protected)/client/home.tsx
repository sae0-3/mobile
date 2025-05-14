import { SafeAreaView, ScrollView, View } from 'react-native';
import { Category } from '../../../src/components/Category';
import { SliderDishItem } from '../../../src/components/SliderDishItem';
import { useGetAllCategories } from '../../../src/hooks/useCategories';

export default function HomeScreen() {
  const { data } = useGetAllCategories();

  return (
    <SafeAreaView className="gap-5 py-3 px-4">
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal={true}
      >
        <View className="flex flex-row gap-3">
          {data?.data.map(category => (
            <Category
              id={category.id}
              name={category.name}
              key={category.id}
            />
          ))}
        </View>
      </ScrollView>

      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal={false}
      >
        <View className="gap-4">
          {data?.data.map((categoria) => (
            <SliderDishItem
              key={categoria.id}
              id={categoria.id}
              nameCategory={categoria.name}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
