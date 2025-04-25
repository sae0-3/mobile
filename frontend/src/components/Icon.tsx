import {
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import { ViewStyle } from 'react-native';
import colors from '../theme/colors';

type IconProps = {
  name: string;
  size?: number;
  color?: string;
  type?: 'Feather' | 'Ionicons' | 'MaterialIcons' | 'MaterialCommunityIcons';
  style?: ViewStyle;
};

export const Icon = ({
  name,
  size = 24,
  color = colors.primary,
  type = 'Feather',
  style,
}: IconProps) => {
  const iconProps = { name: name as any, size, color, style };
  let icon;

  switch (type) {
    case 'Ionicons':
      icon = <Ionicons {...iconProps} />;
      break;
    case 'MaterialIcons':
      icon = <MaterialIcons {...iconProps} />;
      break;
    case 'Feather':
      icon = <Feather {...iconProps} />;
      break;
    case 'MaterialCommunityIcons':
      icon = <MaterialCommunityIcons {...iconProps} />;
      break;
  };

  return icon;
};
