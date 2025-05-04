import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, Button, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import WebView from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import colors from '../../../../src/theme/colors';

const mockOrders = [
  { id: '1', clientName: 'Juan Perez', address: 'Av. san Martin 123', phone: 72165841, lat: -17.7832, lon: -63.1821 },
  { id: '2', clientName: 'Maria Lopez', address: 'Calle Falsa 456', phone: 75415695, lat: -17.7815, lon: -63.1817 },
];

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
    Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return (R * c).toFixed(2);
}

export default function OrderDetailScreen() {
  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const order = mockOrders.find(o => o.id === id);

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

  const distance = calculateDistance(location.latitude, location.longitude, order.lat, order.lon);

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
    <style>body, html { margin: 0; padding: 0; } #map { width: 100%; height: 100vh; }</style>
</head>
<body>
    <div id="map"></div>
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    <script>
        const map = L.map('map').setView([${location.latitude}, ${location.longitude}], 18);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: ''
        }).addTo(map);
        L.marker([${location.latitude}, ${location.longitude}]).addTo(map);
    </script>
</body>
</html>
`;

  return (
    <View className="flex-1 bg-white">
      <View style={{ flex: 8 }}>
        <WebView
          source={{ html: htmlContent }}
          style={{ flex: 1 }}
          javaScriptEnabled={true}
        />
      </View>

      <View style={{ flex: 2 }} className="bg-white px-6 py-4 border-t border-gray-200">
        <Text className="text-lg font-bold mb-2 text-gray-800">Pedido de {order.clientName}</Text>
        <View className="flex-row items-center mb-1">
          <Ionicons name="location-outline" size={20} color="#000" className="mr-2" />
          <Text className="text-base text-gray-700">{order.address}</Text>
        </View>

        <View className="flex-row items-center mb-3">
          <Ionicons name="walk-outline" size={20} color="#000" className="mr-2" />
          <Text className="text-base text-gray-700">{distance} km</Text>
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
