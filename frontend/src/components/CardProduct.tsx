import { Image, Text, View } from 'react-native';

type CardProductProps = {
  id: string;
  name: string;
  price: number;
  imgUrl: string;
  available: boolean;
};

export const CardProduct = (props: CardProductProps) => {
  const { id, name, price, imgUrl, available } = props;

  return (
    <View className="justify-center items-center gap-2">
      <Image
        source={{ uri: imgUrl }}
        className="h-[175px] w-[237px] rounded-xl"
      />

      <View className="w-full gap-3">
        <View className="flex-row justify-between">
          <Text className="text-lg">
            {name}
          </Text>
          <Text className="text-lg">
            Bs {price}
          </Text>
        </View>

        <View className="flex-row justify-between">
          <Text className={`py-1 px-2 rounded-xl text-center ${available ? 'bg-green-200' : 'bg-red-200'}`}>
            {available ? 'Disponible' : 'Agotado'}
          </Text>
        </View>
      </View>
    </View>
  );
};
