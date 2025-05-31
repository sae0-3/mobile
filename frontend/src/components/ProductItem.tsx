import { View, Text, Image } from 'react-native';

interface ProductItemProps {
  image: string;
  name: string;
  subtotal: number;
  quantity: number;
}

export const ProductItem = ({ image, name, subtotal, quantity }: ProductItemProps) => (
  <View className="flex-row justify-between gap-4 items-center">
    <View className="flex-row items-center gap-2 flex-1 flex-wrap">
      <Image
        source={{ uri: image }}
        className="w-16 aspect-square rounded-xl bg-gray-200"
      />

      <Text className="font-medium">
        {name}
      </Text>
    </View>

    <Text className="font-medium">
      x{quantity} — Bs {subtotal}
    </Text>
  </View>
);
