import { SafeAreaView, ScrollView, View } from 'react-native';
import { Category } from '../../../../src/components/Category';
import { SliderDishItem } from '../../../../src/components/SliderDishItem';
import { useGetAllCategories } from '../../../../src/hooks/useCategories';

export default function HomeScreen() {
  const { data } = useGetAllCategories();

  return (
    <SafeAreaView>
      <View className="mx-auto w-11/12 py-5 gap-4">
        {/* <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal={true}
        >
          <View className="flex-row gap-4">
            {data?.data.map(category => (
              <Category
                id={category.id}
                name={category.name}
                key={category.id}
              />
            ))}
          </View>
        </ScrollView> */}

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
