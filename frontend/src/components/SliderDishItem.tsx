import { ScrollView, Text, View } from 'react-native';
import { useProductForCategory } from '../hooks/useCategories';
import { CardProduct } from './CardProduct';
import { Loading } from './Loading';

type SliderDishProps = {
  id: string;
  nameCategory: string;
};

export const SliderDishItem = (props: SliderDishProps) => {
  const { id, nameCategory } = props;
  const { data, isLoading, isError, error } = useProductForCategory(id);

  if (isError) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500 italic">Error: {error.response?.data.message}</Text>
      </View>
    );
  }

  return (
    <View className="gap-1">
      <Text className="text-3xl font-bold">
        {nameCategory}
      </Text>

      {isLoading ? (
        <Loading />
      ) : (
        <>
          {data?.data.length === 0 ? (
            <View className="items-center">
              <Text className="text-gray-500 text-lg">
                No existen productos en la categoría
              </Text>
            </View>
          ) : (
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal={true}
            >
              <View className="flex-row gap-6 p-1">
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
          )}
        </>
      )}
    </View>
  );
};
