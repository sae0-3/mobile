import { View, Text, Image } from 'react-native';

interface ProductItemProps {
  imagen: string;
  name: string;
  price: number;
  cantidad: number;
}

export const ProductItem = ({ imagen, name, price, cantidad }: ProductItemProps) => (
  <View className="flex-row items-center justify-between p-4 mb-4 bg-white rounded-2xl shadow-md">
    <Image
      source={{ uri: imagen }}
      className="w-16 h-16 rounded-xl bg-gray-200 mr-5"
    />
    <View className="flex-1">
      <Text className="text-lg font-semibold text-gray-900">{name}</Text>
      <Text className="text-base text-gray-600">{price} Bs</Text>
    </View>
    <Text className="text-base font-bold text-gray-800">x {cantidad}</Text>
  </View>
);
