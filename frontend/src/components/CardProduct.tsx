import { useRouter } from 'expo-router';
import { Image, Pressable, Text, View } from 'react-native';
import { AddToCart } from './AddToCart';

type CardProductProps = {
  id: string;
  name: string;
  price: number;
  imgUrl: string;
  available: boolean;
};

export const CardProduct = (props: CardProductProps) => {
  const { name, price, imgUrl } = props;
  const router = useRouter();

  return (
    <Pressable
      onPress={() => {
        {
          router.push({
            pathname: '/client/productDetails',
            params: { productId: props.id }
          });
        }
      }}
    >
      <View className="justify-center items-center gap-4 w-60 bg-gray-100 shadow-md shadow-black rounded-xl p-2">
        <Image
          source={{ uri: imgUrl }}
          className="h-44 w-full rounded-xl"
        />

        <View className="w-full gap-2">
          <View className="flex-row justify-between items-center flex-wrap">
            <Text className="font-medium text-lg">
              {name}
            </Text>
            <Text className="italic">
              Bs {price}
            </Text>
          </View>

          <AddToCart {...props} />
        </View>
      </View>
    </Pressable>
  );
};
