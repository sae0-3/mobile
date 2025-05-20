import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { useDeleteLocation, useGetAllLocations } from '../hooks/useLocations';
import colors from '../theme/colors';
import { Icon } from './Icon';

export const CardLocations = () => {
  const { data, isLoading } = useGetAllLocations();
  const { mutate: remove, isPending } = useDeleteLocation();

  const handleAddLocation = () => { };

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <View className="gap-4">
      <Text className="text-xl font-bold">
        Ubicaciones Registradas
      </Text>

      {data.data.length > 0 ? (
        <View className="gap-4 mb-1">
          {data.data.map((location) => (
            <View
              key={location.id}
              className="flex-row justify-between items-center"
            >
              <View className="flex-row items-center gap-1 w-8/12">
                <Icon name="location" type="Ionicons" size={32} />

                <View className="gap-1">
                  <Text className="font-medium">{location.address}</Text>
                  <Text className="text-sm">({location.latitud}, {location.longitud})</Text>
                  <Text className="text-sm">Registrado: {
                    new Date(location.created_at).toLocaleDateString('es-ES')}
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                className="border justify-center items-center border-primary p-2 rounded-lg disabled:opacity-50"
                onPress={() => remove(location.id)}
                disabled={isPending}
              >
                <Text className="text-primary">
                  Eliminar
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      ) : (
        <View className="items-center py-4">
          <Text className="text-gray-400 italic">No existen ubicaciones registradas</Text>
        </View>
      )}

      <TouchableOpacity
        className="flex-row gap-1 justify-center items-center border border-primary rounded-lg p-2"
        onPress={handleAddLocation}
      >
        <Text className="text-primary">Agregar Nueva Ubicación</Text>
        <Icon name="plus"></Icon>
      </TouchableOpacity>
    </View>
  );
};
