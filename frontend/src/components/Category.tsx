import { Text, View } from 'react-native';

type CategoryProps = {
  id: string;
  name: string;
};

export const Category = (category: CategoryProps) => {
  const { name } = category;

  return (
    <View className="w-44 h-14 bg-black rounded-2xl items-center justify-center flex">
      <Text className="text-white text-lg font-normal font-['Jaro']">
        {name}
      </Text>
    </View>
  );
};
