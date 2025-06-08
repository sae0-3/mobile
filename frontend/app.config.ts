import 'dotenv/config';

export default {
  "expo": {
    "owner": "movil_progra",
    "name": "RescueFood",
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
      "package": "com.mobile.rescuefood",
      "adaptiveIcon": {
        "foregroundImage": "./assets/logo.png",
        "backgroundColor": "#ffffff"
      },
      "permissions": [
        "ACCESS_FINE_LOCATION",
        "ACCESS_COARSE_LOCATION",
      ],
      "config": {
        "googleMaps": {
          "apiKey": process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
        },
      },
    },
    "web": {
      "favicon": "./assets/favicon.png",
      "bundler": "metro"
    },
    "extra": {
      "API_URL": process.env.EXPO_PUBLIC_API_URL,
      "GOOGLE_MAPS_API_KEY": process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
      "eas": {
        "projectId": "e36ecd17-4d64-4449-828c-ca52b7932254",
      },
    },
  }
};
