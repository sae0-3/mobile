import { ActivityIndicator, View } from 'react-native';
import colors from '../theme/colors';

export const Loading = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator
        size="large"
        color={colors.primary}
      />
    </View>
  );
}
