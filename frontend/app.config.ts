import 'dotenv/config';

export default {
  "expo": {
    "name": "mobil-frontend",
    "slug": "mobil-frontend",
    "scheme": "mobil-frontend",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "newArchEnabled": true,
    "splash": {
      "image": "./assets/splash-icon.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "permissions": [
        "ACCESS_FINE_LOCATION",
        "ACCESS_COARSE_LOCATION",
      ]
    },
    "web": {
      "favicon": "./assets/favicon.png",
      "bundler": "metro"
    },
    "extra": {
      "API_URL": process.env.API_URL,
      "GOOGLE_MAPS_API_KEY": process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
    },
  }
};
