import { useLocalSearchParams, useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import { Loading } from '../../../../src/components/Loading';
import { OrderInfo } from '../../../../src/components/OrderInfo';
import { OrderMap } from '../../../../src/components/OrderMap';
import { useCurrentLocation } from '../../../../src/hooks/useCurrentLocation';
import { useOrderLocation } from '../../../../src/hooks/useDelivery';
import { useRouteToClient } from '../../../../src/hooks/useRouteToClient';
import { getMapCenter } from '../../../../src/utils/mapUtils';
import { getTravelMode, getVehicleIconName } from '../../../../src/utils/travelHelpers';

export default function OrderDetailScreen() {
  const { id } = useLocalSearchParams();
  const { data, isLoading } = useOrderLocation(id.toString());
  const { location } = useCurrentLocation();
  const router = useRouter();

  const orderLocation = data?.data;

  const travelMode = getTravelMode(orderLocation?.dealer_vehicle);

  const origin = location ? `${location.latitude},${location.longitude}` : '';
  const destination = orderLocation ? `${orderLocation.latitud},${orderLocation.longitud}` : '';

  const { data: routeData, isLoading: isRouteLoading } = useRouteToClient({ origin, destination, mode: travelMode });


  if (isLoading || !orderLocation) return <Loading />;

  const mapRegion = getMapCenter(
    location,
    parseFloat(orderLocation.latitud),
    parseFloat(orderLocation.longitud)
  );

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
