import { Text, View } from 'react-native';
import { Category } from '../types/apiTypes';
import { CustomButton } from './CustomButton';
import { SquarePen, EyeOff, Eye } from 'lucide-react-native';

export const EditCategoryItem = ({ category }: { category: Category }) => {
  return (
    <View
      className="border-b border-b-gray-300 rounded flex-row justify-between py-3 items-center"
    >
      <View className="gap-2">
        <Text className="font-bold">{category.name}</Text>

        {category.visible ? (
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

      <CustomButton
        icon={{ Icon: SquarePen, size: 30 }}
        onPress={() => { }}
      />
    </View>
  );
};
