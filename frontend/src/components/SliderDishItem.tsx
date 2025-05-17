import { ScrollView, Text, View } from 'react-native';
import { useProductForCategory } from '../hooks/useCategories';
import { CardProduct } from './CardProduct';

type SliderDishProps = {
  id: string;
  nameCategory: string;
}

export const SliderDishItem = (props: SliderDishProps) => {
  const { id, nameCategory } = props;
  const { data } = useProductForCategory(id);

  return (
    <View className="gap-3">
      <Text className="text-3xl font-bold">
        {nameCategory}
      </Text>

      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal={true}
      >
        <View className="flex-row gap-4">
          {data?.data.map(({ id, name, img_reference, price, available }) => (
            <CardProduct
              key={id}
              id={id}
              name={name}
              price={price}
              imgUrl={img_reference || ''}
              available={available}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
