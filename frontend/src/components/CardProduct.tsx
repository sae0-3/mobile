import { Image, Text, View } from 'react-native';
import { AddToCart } from './AddToCart';

type CardProductProps = {
  id: string;
  name: string;
  price: number;
  imgUrl: string;
  available: boolean;
};

export const CardProduct = (props: CardProductProps) => {
  const { name, price, imgUrl, available } = props;

  return (
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
  );
};
