export function getMapCenter(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  return {
    latitude: (lat1 + lat2) / 2,
    longitude: (lon1 + lon2) / 2,
    latitudeDelta: Math.abs(lat1 - lat2) + 0.02,
    longitudeDelta: Math.abs(lon1 - lon2) + 0.02,
  };
}
