import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import colors from '../../../../src/theme/colors';
import { useRouteToClient } from '../../../../src/hooks/useRouteToClient';
import { useOrderLocation } from '../../../../src/hooks/useDelivery';
import { getTravelMode, getVehicleIconName } from '../../../../src/utils/travelHelpers';
import { useCurrentLocation } from '../../../../src/hooks/useCurrentLocation';
import { getMapCenter } from '../../../../src/utils/mapUtils';
import { OrderMap } from '../../../../src/components/OrderMap';
import { OrderInfo } from '../../../../src/components/OrderInfo';

export default function OrderDetailScreen() {
  const { id } = useLocalSearchParams();
  const { data, isLoading } = useOrderLocation(id.toString());
  const { location, errorMsg } = useCurrentLocation();
  const router = useRouter();

  const orderLocation = data?.data;

  const travelMode = getTravelMode(orderLocation?.dealer_vehicle);


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
      </View>
    );
  }

  const mapRegion = getMapCenter(location.latitude, location.longitude, parseFloat(orderLocation.latitud), parseFloat(orderLocation.longitud));

  return (
    <View className="flex-1 bg-white">
      <OrderMap
        mapRegion={mapRegion}
        origin={location}
        destination={{
          latitude: parseFloat(orderLocation.latitud),
          longitude: parseFloat(orderLocation.longitud)
        }}
      />
      <OrderInfo
        clientName={orderLocation.client_name}
        clientAddress={orderLocation.client_address}
        vehicleIcon={getVehicleIconName(orderLocation.dealer_vehicle)}
        routeData={routeData}
        isRouteLoading={isRouteLoading}
        onContinue={() => router.push(`/dealer/delivery/${id}`)}
      />
    </View>
  );
}

