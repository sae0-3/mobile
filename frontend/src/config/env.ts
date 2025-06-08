import Constants from 'expo-constants';

const getEnvVar = (key: string): string => {
  const value = Constants.expoConfig?.extra?.[key];
  if (!value) throw new Error(`Falta la variable de entorno: ${key}`);
  return value;
};

export const config = {
  API_URL: getEnvVar('API_URL'),
  GOOGLE_MAPS_API_KEY: getEnvVar('GOOGLE_MAPS_API_KEY'),
} as const;
