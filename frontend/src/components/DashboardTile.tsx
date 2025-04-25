import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import type { LucideIcon } from 'lucide-react-native';

export const DashboardTile = ({ icon, title, onPress }: {
  icon: {
    Icon: LucideIcon,
    color?: string,
    size?: number,
  },
  title: string,
  onPress: () => void,
}) => {
  const { Icon, size, color } = icon;
  return (
    <TouchableOpacity
      onPress={onPress}
      className="w-[45%] aspect-square bg-white rounded-2xl items-center justify-center shadow-md m-2"
    >
      <Icon size={size || 40} color={color || '#4F46E5'} />
      <Text className="mt-2 text-base font-semibold text-gray-800">{title}</Text>
    </TouchableOpacity>
  );
}
