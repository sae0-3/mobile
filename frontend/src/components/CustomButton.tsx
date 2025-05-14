import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { Icon } from './Icon';

type IconProps = {
  name: string;
  size?: number;
  color?: string;
  type?: 'Feather' | 'Ionicons' | 'MaterialIcons';
};

type CustomButtonProps = {
  title?: string;
  onPress: () => void | Promise<void>;
  iconRight?: IconProps;
  className?: string;
  disabled?: boolean;
  loading?: boolean
};

export const CustomButton = ({
  title,
  onPress,
  iconRight,
  className,
  disabled = false,
  loading = false,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      className={`flex-row items-center justify-center rounded-md bg-primary disabled:opacity-80 ${className}`}
      onPress={onPress}
    >
      {loading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <>
          {title && (
            <Text className={`text-white text-lg`}>
              {title}
            </Text>
          )}

          {iconRight && (
            <Icon
              name={iconRight.name}
              size={iconRight.size}
              color={iconRight.color || '#fff'}
              type={iconRight.type}
            />
          )}
        </>
      )}
    </TouchableOpacity>
  );
};
