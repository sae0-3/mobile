import { Text, View } from 'react-native';
import { Icon } from './Icon';

type WarningMessageProps = {
  message: string
};

export const WarningMessage = (props: WarningMessageProps) => {
  return (
    <View className="flex-row border border-primary p-2 items-center justify-center gap-2 rounded-lg">
      <Icon name="warning-outline" type="Ionicons" />
      <Text className="text-primary font-medium">
        {props.message}

      </Text>
    </View>
  );
};
