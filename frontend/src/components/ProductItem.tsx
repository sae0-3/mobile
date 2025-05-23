import { View, Text, Image } from 'react-native';

interface ProductItemProps {
  image: string;
  name: string;
  price: number;
  quantity: number;
}

export const ProductItem = ({ image, name, price, quantity }: ProductItemProps) => (
  <View className="flex-row items-center justify-between p-4 bg-white rounded-xl shadow-md">
    <Image
      source={{ uri: image }}
      className="w-16 h-16 rounded-xl bg-gray-200 mr-5"
    />

    <View className="flex-1">
      <Text className="text-lg font-semibold text-gray-900">{name}</Text>
      <Text className="text-gray-600">{price} Bs</Text>
    </View>

    <Text className="font-bold text-gray-800">x {quantity}</Text>
  </View>
);
