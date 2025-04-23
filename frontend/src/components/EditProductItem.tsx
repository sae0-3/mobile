import { Check, DollarSign, Eye, EyeOff, SquarePen, X } from 'lucide-react-native';
import { Text, View } from 'react-native';
import { ProductResponse } from '../types/apiTypes';
import { CustomButton } from './CustomButton';

export const EditProductItem = ({ product }: { product: ProductResponse }) => {
  return (
    <View
      className="border-b border-b-gray-300 rounded flex-row justify-between py-3 items-center"
    >
      <View className="gap-1">
        <Text className="font-bold">{product.name}</Text>

        <View className="flex-row items-center opacity-50">
          <DollarSign size="12" color="#000" />
          <Text>{product.price}</Text>
        </View>

        <View className="flex-row gap-2">
          <View className={`flex-row items-center gap-px p-1 rounded bg-${product.available ? 'green' : 'red'}-100`}>
            {product.available ? (
              <>
                <Check size="12" color="#000" />
                <Text className="text-sm">Disponible</Text>
              </>
            ) : (
              <>
                <X size="12" color="#000" />
                <Text className="text-sm">No disponible</Text>
              </>
            )}
          </View>

          <View className={`flex-row items-center gap-px p-1 rounded bg-${product.visible ? 'green' : 'red'}-100`}>
            {product.visible ? (
              <>
                <Eye size="12" color="#000" />
                <Text>Visible</Text>
              </>
            ) : (
              <>
                <EyeOff size="12" color="#000" />
                <Text>No visible</Text>
              </>
            )}
          </View>
        </View>
      </View>

      <CustomButton
        icon={{ Icon: SquarePen, size: 30 }}
        onPress={() => { console.log(product.id) }}
        className=""
      />
    </View>
  );
};
