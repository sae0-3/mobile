export const getTravelMode = (vehicle: string | undefined): "driving" | "bicycling" => {
  switch (vehicle) {
    case 'car':
      return 'driving';
    case 'motorcycle':
      return 'driving';
    case 'bicycle':
      return 'bicycling';
    default:
      return 'driving';
  }
};

export const getVehicleIconName = (vehicle: string | undefined) => {
  switch (vehicle) {
    case 'car':
      return 'car';
    case 'motorcycle':
      return 'motorbike';
    case 'bicycle':
      return 'bike';
    default:
      return 'map-marker-path';
  }
};