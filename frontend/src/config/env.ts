import Constants from 'expo-constants';

export const config = {
  API_URL: Constants.expoConfig?.extra?.API_URL,
} as const;
