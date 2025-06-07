import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { Alert } from 'react-native';
import { Coordinates } from '../types/apiTypes';

const INITIAL_REGION = {
  latitude: -17.383880385620692,
  longitude: -66.15733392851239,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
}

export const useAddLocation = (visible: boolean) => {
  const [marker, setMarker] = useState<Coordinates | null>(null);
  const [address, setAddress] = useState<string>('');
  const [region, setRegion] = useState(INITIAL_REGION);

  const reset = () => {
    setMarker(null);
    setAddress('');
    setRegion(INITIAL_REGION);
  };

  const handleUseMyLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') {
      const location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setMarker(coords);
      setRegion({ ...coords, latitudeDelta: 0.01, longitudeDelta: 0.01 });

      const [place] = await Location.reverseGeocodeAsync(coords);
      setAddress(place?.formattedAddress || '');
    } else {
      Alert.alert('Permiso denegado', 'Selecciona tu ubicación manualmente en el mapa.');
    }
  };

  const handleMapPress = async (coords: Coordinates) => {
    setMarker(coords);
    const [place] = await Location.reverseGeocodeAsync(coords);
    setAddress(place?.formattedAddress || '');
  };

  useEffect(() => {
    if (visible) {
      handleUseMyLocation();
    } else {
      reset();
    }
  }, [visible]);

  return {
    marker,
    address,
    region,
    reset,
    handleUseMyLocation,
    handleMapPress,
  };
};
