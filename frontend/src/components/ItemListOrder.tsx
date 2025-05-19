import { Image, Text, View } from 'react-native';
import { useCartStore } from '../stores/order';
import { Product } from '../types/orderTypes';
import { AddToCart } from './AddToCart';

export const ItemListOrder = (product: Product) => {
  const { getSubtotal } = useCartStore();

  return (
    <View className="flex-row justify-between items-center bg-gray-100 p-2 shadow-md shadow-black m-1 rounded-lg">
      <View className="gap-2">
        <Image
          source={{ uri: product.img_reference }}
          className="h-20 aspect-video rounded-xl"
        />

        <Text className="text-center font-semibold">
          {product.name}
        </Text>
      </View>

      <View className="w-1/3 gap-2">
        <AddToCart
          {...product}
          imgUrl={product.img_reference}
          available
        />

        <Text className="text-center italic">
          Precio: Bs {getSubtotal(product.id)}
        </Text>
      </View>
    </View>
  );
};
