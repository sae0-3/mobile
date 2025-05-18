import { Text, TouchableOpacity, View } from 'react-native';
import { Icon } from './Icon';

export const CardLocations = () => {
  const handleAddLocation = () => { };

  return (
    <View className="gap-4">
      <Text className="text-xl font-bold">
        Ubicaciones Registradas
      </Text>

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
