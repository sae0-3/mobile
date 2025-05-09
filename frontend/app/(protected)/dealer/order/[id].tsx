import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons'
import colors from '../../../../src/theme/colors';
import { Order } from '../../../../src/types/apiTypes';

const mockOrders: Order[] = [
  { id: '1', clientName: 'Juan Perez', address: 'Av. san Martin 123', items: ['Pizza', 'Ensalada'], phone: 72165841, latitude: -17.35299, longitude: -66.18922 },
  { id: '2', clientName: 'Maria Lopez', address: 'Calle Falsa 456', items: ['Hamburguesa', 'Papas fritas'], phone: 75415695, latitude: -17.36667, longitude: -66.19836 },
];

export default function OrderDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const order = mockOrders.find(o => o.id === id);

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

  if (errorMsg) {
    return (
      <View className="flex-1 justify-center items-center bg-white px-4">
        <Text className="text-black text-lg">{errorMsg}</Text>
      </View>
    );
  }

  if (!location || !order) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color={colors.primary} />
        <Text>Cargando ubicación...</Text>
      </View>
    );
  }

  const centerLat = (location.latitude + order.latitude) / 2;
  const centerLon = (location.longitude + order.longitude) / 2;

  return (
    <View className="flex-1 bg-white">
      <View className="flex-1 justify-center items-center">
        <MapView
          style={style.map}
          initialRegion={{
            latitude: centerLat,
            longitude: centerLon,
            latitudeDelta: Math.abs(location.latitude - order.latitude) + 0.02,
            longitudeDelta: Math.abs(location.longitude - order.longitude) + 0.02,
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
              latitude: order.latitude,
              longitude: order.longitude
            }}
            title="cliente"
            description="Destino"
          />
        </MapView>
      </View>
      <View className="flex-2 bg-white px-6 py-4 border-t border-gray-200">
        <Text className="text-lg font-bold mb-2 text-gray-800">Pedido de {order.clientName}</Text>
        <View className="flex-row items-center mb-1">
          <Ionicons name="location-outline" size={20} color="#000" className="mr-2" />
          <Text className="text-base text-gray-700">{order.address}</Text>
        </View>

        <View className="flex-row items-center mb-3">
          <Ionicons name="walk-outline" size={20} color="#000" className="mr-2" />

          <Text className="text-base text-gray-700">
            Llegarás en 5km
          </Text>

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
