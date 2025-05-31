export function getMapCenter(
  location: { latitude: number; longitude: number } | null,
  lat2: number,
  lon2: number
) {
  if (location === null) {
    return {
      latitude: lat2,
      longitude: lon2,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
  }

  return {
    latitude: (location.latitude + lat2) / 2,
    longitude: (location.longitude + lon2) / 2,
    latitudeDelta: Math.abs(location.latitude - lat2) + 0.02,
    longitudeDelta: Math.abs(location.longitude - lon2) + 0.02,
  };
}
