import axios from 'axios';
import { config } from '../config/env';
import { TravelEstimate } from '../types/apiTypes';

export const getRouteDetails = async ({
  origin,
  destination,
  mode,
}: {
  origin: string;
  destination: string;
  mode: 'driving' | 'bicycling' | 'walking';
}): Promise<TravelEstimate> => {
  const response = await axios.get('https://maps.googleapis.com/maps/api/directions/json', {
    params: {
      origin,
      destination,
      mode,
      key: config.GOOGLE_MAPS_API_KEY,
    }
  });
  if (response.data.status != 'OK') {
    throw new Error('Error en el fetching directions')
  }
  const leg = response.data.routes[0].legs[0];
  return {
    distance: leg.distance.text,
    duration: leg.duration.text,
  }
}