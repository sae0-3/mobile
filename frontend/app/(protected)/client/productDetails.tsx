import { useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, Image, ScrollView, Text, View } from 'react-native';
import { AddToCart } from '../../../src/components/AddToCart';
import { Icon } from '../../../src/components/Icon';
import { useGetByIdProduct } from '../../../src/hooks/useProduct';
import colors from '../../../src/theme/colors';

export default function ProductDetailsScreen() {
  const { productId } = useLocalSearchParams();
  const { data, isLoading } = useGetByIdProduct(String(productId));

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!data) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-gray-500">Producto no encontrado</Text>
      </View>
    );
  }

  const product = data.data;
  const ingredientsList = product.ingredients ? product.ingredients
    .map(item => item.trim())
    .filter(item => item.length > 0)
    : [];

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
    >
      <View className="w-11/12 mx-auto pb-6 pt-4 gap-4">
        <Image
          source={{ uri: product.img_reference || '' }}
          className="h-64 w-64 rounded-lg"
        />

        <View className="flex-row justify-between items-center flex-wrap">
          <Text className="text-2xl font-semibold text-gray-800">{product.name}</Text>
          <Text className="text-xl font-semibold text-primary italic">Bs {product.price}</Text>
        </View>

        {!!product.description ? (
          <Text>{product.description}</Text>
        ) : (
          <Text className="italic text-gray-500">No cuenta con descripción</Text>
        )}

        <View className="gap-2">
          <Text className="text-xl font-medium text-gray-800">Ingredientes:</Text>
          {ingredientsList.length === 0 ? (
            <Text className="italic text-gray-500">
              No existen ingredientes registrados
            </Text>
          ) : (
            <View className="gap-1">
              {ingredientsList.map((ingredient, idx) => (
                <View
                  key={idx}
                  className="flex-row items-center"
                >
                  <Icon name="dot-single" type="Entypo" />
                  <Text>{ingredient}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        <AddToCart
          id={product.id}
          name={product.name}
          price={product.price}
          imgUrl={product.img_reference || ''}
          available={product.available}
        />
      </View>
    </ScrollView>
  );
}
