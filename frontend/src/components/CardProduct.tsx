import { Image, Pressable, Text, View } from 'react-native';
import { AddToCart } from './AddToCart';
import { useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';

type CardProductProps = {
  id: string;
  name: string;
  price: number;
  imgUrl: string;
  available: boolean;
};

export const CardProduct = (props: CardProductProps) => {
  const { name, price, imgUrl, available } = props;
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => { {
        router.push({
          pathname: '/client/detail',
          params: { productId: props.id }
        });
      } }}
    >
      <View className="justify-center items-center gap-3 w-60">
        <Image
          source={{ uri: imgUrl }}
          className="h-44 w-full rounded-xl"
        />
        <View className="w-full gap-3">
          <View className="flex-row justify-between items-center">
            <Text>
              {name}
            </Text>
            <Text>
              Bs {price}
            </Text>
          </View>

          <AddToCart {...props} />
        </View>
      </View>
    </TouchableOpacity>
  );
};
