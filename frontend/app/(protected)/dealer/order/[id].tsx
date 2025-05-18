import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import colors from '../../../../src/theme/colors';
import { useRouteToClient } from '../../../../src/hooks/useRouteToClient';
import { useOrderLocation } from '../../../../src/hooks/useDelivery';


const getTravelMode = (vehicle: string | undefined): "driving" | "bicycling" => {
  switch (vehicle) {
    case "car":
      return "driving";
    case "motorcycle":
      return "driving";
    case "bicycle":
      return "bicycling";
    default:
      return "driving";
  }
};

const getVehicleIconName = (vehicle: string | undefined): keyof typeof MaterialCommunityIcons.glyphMap => {
  switch (vehicle) {
    case "car":
      return "car";
    case "motorcycle":
      return "motorbike";
    case "bicycle":
      return "bike";
    default:
      return "map-marker-path";
  }
};

export default function OrderDetailScreen() {
  const { id } = useLocalSearchParams();
  const { data, isLoading } = useOrderLocation(id.toString());

  const orderLocation = data?.data;

  const router = useRouter();

  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const travelMode = getTravelMode(orderLocation?.dealer_vehicle);

  useEffect(() => {
    let subscriber: Location.LocationSubscription;

    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permiso denegado para acceder a la ubicación');
        return;
      }

      subscriber = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,
          distanceInterval: 2,
        },
        (loc) => setLocation(loc.coords)
      )
    }
    getLocation();

    return () => subscriber && subscriber.remove();
  }, []);

  const origin = location ? `${location.latitude},${location.longitude}` : '';
  const destination = orderLocation ? `${orderLocation.latitud},${orderLocation.longitud}` : '';

  const { data: routeData, isLoading: isRouteLoading } = useRouteToClient({ origin, destination, mode: travelMode });


  if (errorMsg) {
    return (
      <View className="flex-1 justify-center items-center bg-white px-4">
        <Text className="text-black text-lg">{errorMsg}</Text>
      </View>
    );
  }

  if (isLoading || !location || !orderLocation) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color={colors.primary} />
        <Text>Cargando ubicación...</Text>
      </View>
    );
  }

  const centerLat = (location.latitude + parseFloat(orderLocation.latitud)) / 2;
  const centerLon = (location.longitude + parseFloat(orderLocation.longitud)) / 2;

  return (
    <View className="flex-1 bg-white">
      <View className="flex-1 justify-center items-center">
        <MapView
          style={style.map}
          initialRegion={{
            latitude: centerLat,
            longitude: centerLon,
            latitudeDelta: Math.abs(location.latitude - parseFloat(orderLocation.latitud)) + 0.02,
            longitudeDelta: Math.abs(location.longitude - parseFloat(orderLocation.longitud)) + 0.02,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude
            }}
            title="Tu ubicación"
            description="Ubicación actual del repartidor"
          />
          <Marker
            coordinate={{
              latitude: parseFloat(orderLocation.latitud),
              longitude: parseFloat(orderLocation.longitud)
            }}
            title="cliente"
            description="Destino"
          />
        </MapView>
      </View>
      <View className="flex-2 bg-white px-6 py-4 border-t border-gray-200">
        <Text className="text-lg font-bold mb-2 text-gray-800">Pedido de {orderLocation.client_name}</Text>
        <View className="flex-row items-center mb-1">
          <Ionicons name="location-outline" size={20} color="#000" className="mr-2" />
          <Text className="text-base text-gray-700">{orderLocation.client_address}</Text>
        </View>

        <View className="flex-row items-center mb-3">
          <MaterialCommunityIcons name={getVehicleIconName(orderLocation?.dealer_vehicle)} size={20} color="#000" style={{ marginRight: 8 }} />
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
          onPress={() => router.push(`/dealer/delivery/${id}`)}
        >
          <Text className="text-white font-semibold text-base">Continuar con la entrega</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const style = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
});
