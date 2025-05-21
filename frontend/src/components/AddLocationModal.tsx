import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import MapView, { Marker, MapPressEvent } from 'react-native-maps';
import * as Location from 'expo-location';
import { Coordinates } from '../types/apiTypes';
import { useCreateLocation } from '../hooks/useLocations';

interface Props {
  visible: boolean;
  onClose: () => void;
}

export const AddLocationModal = ({ visible, onClose }: Props) => {
  const [marker, setMarker] = useState<Coordinates | null>(null);
  const [address, setAddress] = useState<string>('');
  const { mutate: createLocation, isPending } = useCreateLocation();

  const handleMapPress = async (event: MapPressEvent) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setMarker({ latitude, longitude });

    const [place] = await Location.reverseGeocodeAsync({ latitude, longitude });
    if (place) {
      setAddress(`${place.formattedAddress}`);
    }
  };

  const handleSave = () => {
    if (marker && address) {
      createLocation({
        latitud: marker.latitude,
        longitud: marker.longitude,
        address
      }, {
        onSuccess: () => {
          setMarker(null);
          setAddress('');
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

          <MapView
            className="rounded-xl overflow-hidden mb-3"
            style={{ width: '100%', height: 300 }}
            initialRegion={{
              latitude: -17.383880385620692,
              longitude: -66.15733392851239,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            zoomEnabled
            onPress={handleMapPress}
          >
            {marker && <Marker coordinate={marker} />}
          </MapView>

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

