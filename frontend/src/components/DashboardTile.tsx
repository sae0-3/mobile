import { Text, TouchableOpacity } from 'react-native';
import { Icon } from './Icon';

type DashboardTileProps = {
  title: string;
  onPress: () => void;
  icon: string;
};

export const DashboardTile = ({ icon, title, onPress }: DashboardTileProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="w-[45%] aspect-square bg-white rounded-2xl items-center justify-center shadow-md m-2"
    >
      <Icon name={icon} size={40} />
      <Text className="mt-2 text-base font-semibold text-gray-800">{title}</Text>
    </TouchableOpacity>
  );
}
