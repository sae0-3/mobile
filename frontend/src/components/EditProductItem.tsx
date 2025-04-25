import { router } from 'expo-router';
import { Check, DollarSign, Eye, EyeOff, SquarePen, X } from 'lucide-react-native';
import { Text, View } from 'react-native';
import { Product } from '../types/apiTypes';
import { CustomButton } from './CustomButton';

export const EditProductItem = ({ product }: { product: Product }) => {
  return (
    <View
      className="border-b border-b-gray-300 rounded flex-row justify-between py-3 items-center"
    >
      <View className="gap-1">
        <Text className="font-bold">{product.name}</Text>

        <View className="flex-row items-center opacity-65">
          <DollarSign size="12" color="#000" />
          <Text>{product.price}</Text>
        </View>

        <View className="flex-row gap-2 opacity-50">
          {product.available ? (
            <View className="flex-row items-center gap-px p-1 rounded-3xl bg-green-100">
              <Check size="12" color="#000" />
              <Text className="text-sm">Disponible</Text>
            </View>
          ) : (
            <View className="flex-row items-center gap-px p-1 rounded-3xl bg-red-100">
              <X size="12" color="#000" />
              <Text className="text-sm">No disponible</Text>
            </View>
          )}

          {product.visible ? (
            <View className="flex-row items-center gap-px p-1 rounded-3xl bg-green-100">
              <Eye size="12" color="#000" />
              <Text>Visible</Text>
            </View>
          ) : (
            <View className="flex-row items-center gap-px p-1 rounded-3xl bg-red-100">
              <EyeOff size="12" color="#000" />
              <Text>No visible</Text>
            </View>
          )}
        </View>
      </View>

      <CustomButton
        icon={{ Icon: SquarePen, size: 30 }}
        onPress={() => { router.push(`/admin/products/${product.id}`); }}
        className=""
      />
    </View>
  );
};
