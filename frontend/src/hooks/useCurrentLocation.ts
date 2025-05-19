import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

export const useCurrentLocation = () => {
  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [errorMsg, setErrorMsg] = useState('');


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

  return { location, errorMsg }
}