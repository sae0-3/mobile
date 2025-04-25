import { View } from 'react-native';
import CoffeMemo from '../../assets/Coffe';
import CutleryMemo from '../../assets/Cutlery';
import FoodMemo from '../../assets/Food';

export default function RootDecoratedLayout({ children }: { children: React.ReactNode }) {
  return (
    <View className="flex-1 relative">
      <View className="h-[100vh] w-full absolute z-0 inset-0 opacity-35">
        <View className="absolute -rotate-12">
          <CoffeMemo width="150" height="150" />
        </View>

        <View className="absolute bottom-1/3 left-2/3 rotate-45">
          <FoodMemo width="150" height="150" />
        </View>

        <View className="absolute bottom-0 right-2/3 rotate-12">
          <CutleryMemo width="150" height="150" />
        </View>
      </View>

      {children}
    </View>
  );
}
