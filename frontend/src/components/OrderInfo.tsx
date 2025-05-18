import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'


type Props = {
  clientName: string;
  clientAddress: string;
  vehicleIcon: keyof typeof MaterialCommunityIcons.glyphMap;
  routeData?: { duration: string; distance: string };
  isRouteLoading: boolean;
  onContinue: () => void;
};

export const OrderInfo = ({
  clientName,
  clientAddress,
  vehicleIcon,
  routeData,
  isRouteLoading,
  onContinue
}: Props) => {
  return (
    <View className="flex-2 bg-white px-6 py-4 border-t border-gray-200">
      <Text className="text-lg font-bold mb-2 text-gray-800">Pedido de {clientName}</Text>
      <View className="flex-row items-center mb-1">
        <Ionicons name="location-outline" size={20} color="#000" className="mr-2" />
        <Text className="text-base text-gray-700">{clientAddress}</Text>
      </View>

      <View className="flex-row items-center mb-3">
        <MaterialCommunityIcons name={vehicleIcon} size={20} color="#000" style={{ marginRight: 8 }} />
        {isRouteLoading ? (
          <Text className="text-base text-gray-700">Calulando ruta...</Text>
        ) : routeData ? (
          <Text className="text-base text-gray-700">
            {routeData.duration} ({routeData.distance})
          </Text>
        ) : (
          <Text className="text-base text-gray-700 ">No se pudo calcular la ruta</Text>
        )}
      </View>

      <TouchableOpacity
        className="bg-primary py-4 rounded-xl items-center"
        onPress={onContinue}
      >
        <Text className="text-white font-semibold text-base">Continuar con la entrega</Text>
      </TouchableOpacity>
    </View>
  )
}