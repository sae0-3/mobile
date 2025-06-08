import { View, StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Coordinates } from '../types/apiTypes';

type Props = {
  mapRegion: any;
  origin: Coordinates | null;
  destination: Coordinates;
};

export const OrderMap = ({ mapRegion, origin, destination }: Props) => {
  return (
    <View className="flex-1 justify-center items-center">
      <MapView
        style={style.map}
        initialRegion={mapRegion}
        provider={PROVIDER_GOOGLE}
      >{origin && (
        <Marker
          coordinate={origin}
          title="Tu ubicación"
          description="Ubicación actual del repartidor"
        />
      )}
        <Marker
          coordinate={destination}
          title="cliente"
          description="Destino"
        />
      </MapView>
    </View>
  )
}

const style = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
});