import React from 'react';
import { View, Text, Image } from 'react-native';

interface StatusBadgeProps {
  status: string;
}
const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const statusIcons: Record<string, string> = {
    pending: 'https://cdn-icons-png.flaticon.com/128/16265/16265301.png',
    in_progress: 'https://cdn-icons-png.flaticon.com/128/9561/9561688.png',
    delivered: 'https://cdn-icons-png.flaticon.com/128/7708/7708151.png',
  };
  const statusLabels: Record<string, string> = {
    pending: 'Pendiente',
    in_progress: 'En camino',
    delivered: 'Entregado',
  };
  const statusIcon = statusIcons[status] || statusIcons['pending'];
  const statusLabel = statusLabels[status] || 'Pendiente';
  return (
    <View className="flex-row items-center p-3 bg-gray-50 rounded-xl shadow-sm">
      <Image source={{ uri: statusIcon }} className="w-10 h-10 mr-4" />
      <View>
        <Text className="text-sm text-gray-500">Estado</Text>
        <Text className="text-base font-semibold text-gray-800">{statusLabel}</Text>
      </View>
    </View>
  );
};
export default StatusBadge;
