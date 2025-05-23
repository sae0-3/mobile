import { Text, View } from 'react-native';
import { Icon } from './Icon';

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const statusIcons: Record<string, string> = {
    pending: 'hourglass-start',
    in_progress: 'truck-fast',
    delivered: 'list-check',
    cancelled: 'circle-xmark'
  };

  const statusLabels: Record<string, string> = {
    pending: 'Pendiente',
    in_progress: 'En camino',
    delivered: 'Entregado',
    cancelled: 'Cancelado'
  };

  return (
    <View className="flex-row items-center p-3 bg-white rounded-lg shadow-sm gap-4 justify-end">
      <Icon name={statusIcons[status]} type="FontAwesome6" size={30} />

      <View>
        <Text className="text-sm text-gray-500">Estado</Text>
        <Text className="font-semibold text-gray-800">{statusLabels[status]}</Text>
      </View>
    </View>
  );
};
