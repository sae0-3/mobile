import 'dotenv/config';

export default {
  "expo": {
    "owner": "movil_progra",
    "name": "mobil-frontend",
    "slug": "movil",
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
      "GOOGLE_AUTH_CLIENT": process.env.GOOGLE_AUTH_CLIENT,
      "eas": {
        "projectId": "b156b38d-491a-457a-94dd-5561aa15d59b"
      },
    },
  }
};
