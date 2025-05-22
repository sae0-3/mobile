import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import MapView, { MapPressEvent, Marker } from 'react-native-maps';
import { useCreateLocation } from '../hooks/useLocations';
import { Icon } from './Icon';
import { useAddLocation } from '../hooks/useAddLocation';

interface Props {
  visible: boolean;
  onClose: () => void;
}

export const AddLocationModal = ({ visible, onClose }: Props) => {
  const { marker, address, region, reset, handleMapPress, handleUseMyLocation } = useAddLocation(visible);
  const { mutate: createLocation, isPending } = useCreateLocation();
  const handleSave = () => {
    if (marker && address) {
      createLocation({
        latitud: marker.latitude,
        longitud: marker.longitude,
        address
      }, {
        onSuccess: () => {
          reset();
          onClose();
        }
      });
    }
  };
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/50 px-4">
        <View className="bg-white rounded-2xl w-full max-h-[90%] p-4">
          <Text className="text-lg font-semibold mb-2">Selecciona una ubicación</Text>
          <View>
            <MapView
              className="rounded-xl overflow-hidden mb-3"
              style={{ width: '100%', height: 300 }}
              initialRegion={region}
              zoomEnabled
              onPress={(event: MapPressEvent) => handleMapPress(event.nativeEvent.coordinate)}
            >
              {marker && <Marker coordinate={marker} />}
            </MapView>

            <TouchableOpacity
              onPress={handleUseMyLocation}
              className="absolute bottom-4 right-4 bg-primary rounded-full p-3 shadow-lg"
            >
              <Icon name="locate" type="Ionicons" size={24} color="fff" />
            </TouchableOpacity>
          </View>

          {marker && (
            <View className="p-3">
              <Text className="text-gray-700 font-medium mb-2">Dirección:</Text>
              <Text className="font-medium">{address}</Text>
            </View>
          )}

          <View className="flex-row justify-between p-2">
            <TouchableOpacity
              className="px-4 py-2 border border-red-500 rounded-lg"
              onPress={onClose}
            >
              <Text className="text-red-500">Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              disabled={!marker || isPending}
              onPress={handleSave}
              className="px-4 py-2 rounded-lg border border-primary disabled:opacity-40"
            >
              <Text className="text-primary">
                {isPending ? 'Guardando...' : 'Guardar'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

}

