import type { LucideIcon } from 'lucide-react-native';
import { Text, TouchableOpacity } from 'react-native';

export const CustomButton = ({
  title,
  onPress,
  icon,
  className,
  disabled = false,
}: {
  title?: string,
  onPress: () => void,
  icon?: {
    Icon: LucideIcon,
    color?: string,
    size?: number,
  },
  className?: string,
  disabled?: boolean,
}) => {
  const buttonStyle = `flex flex-row items-center justify-center p-2 rounded-lg ${disabled ? 'bg-gray-400' : 'bg-[#4e46e58a]'} ${className || ''}`;
  const textStyle = `text-lg ${disabled ? 'text-gray-200' : 'text-white'}`;

  return (
    <TouchableOpacity
      disabled={disabled}
      className={buttonStyle}
      onPress={onPress}
    >
      {title && <Text className={textStyle}>{title}</Text>}
      {icon && (
        <icon.Icon
          size={icon.size || 24}
          color={disabled ? '#ccc' : icon.color || '#fff'}
        />
      )}
    </TouchableOpacity>
  );
};
