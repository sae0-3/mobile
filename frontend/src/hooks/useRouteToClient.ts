import { useQuery } from '@tanstack/react-query';
import { getRouteDetails } from '../services/routeToClientService';

export const useRouteToClient = ({
  origin,
  destination,
  mode,
}: {
  origin: string;
  destination: string;
  mode: 'driving' | 'bicycling';
}) => {
  return useQuery({
    queryKey: ['route', origin, destination, mode],
    queryFn: () => getRouteDetails({ origin, destination, mode }),
    enabled: !!origin && !!destination && !!mode,
    staleTime: 1000 * 60 * 5
  })
}
