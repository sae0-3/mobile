import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function OrderDetailScreen() {
  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const { id } = useLocalSearchParams();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    })();
  }, []);

  if (errorMsg) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>{errorMsg}</Text>
      </View>
    );
  }

  if (!location) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Loading location...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 justify-center items-center">
      <MapView
        style={{ width: '100%', height: '100%' }}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          title="You are here"
        />
      </MapView>
    </View>
  );
}
