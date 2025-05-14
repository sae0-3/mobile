import { ScrollView, Text, View } from 'react-native';
import { useProductForCategory } from '../hooks/useCategories';
import { Product } from './Product';

type Dish = {
  id: string;
  nameCategory: string;
}

export const SliderDishItem = (dish: Dish) => {
  const { id, nameCategory } = dish;
  const { data } = useProductForCategory(id);

  return (
    <View className="gap-2">
      <Text
        className="px-3 justify-start text-zinc-800 text-3xl font-normal font-['Chau_Philomene_One']"
      >
        {nameCategory}
      </Text>

      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal={true}
      >
        <View className="flex-row gap-4">
          {data?.data.map((producto) => (
            <Product
              key={producto.id}
              name={producto.name}
              price={producto.price}
              imgUrl={producto.img_reference || ''}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
