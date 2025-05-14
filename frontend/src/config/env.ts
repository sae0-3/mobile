import Constants from 'expo-constants';

export const config = {
  API_URL: Constants.expoConfig?.extra?.API_URL,
  GOOGLE_MAPS_API_KEY: Constants.expoConfig?.extra?.GOOGLE_MAPS_API_KEY,
} as const;


