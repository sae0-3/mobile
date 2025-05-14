import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { useEffect } from 'react';
import { Alert } from 'react-native';
import { config } from '../config/env';
import { CustomButton } from './CustomButton';

WebBrowser.maybeCompleteAuthSession();

export const GoogleLoginButton = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: config.GOOGLE_AUTH_CLIENT,
    redirectUri: 'https://auth.expo.io/@movil_progra/movil',
    scopes: ['openid', 'profile', 'email'],
  });

  useEffect(() => {
    const handleResponse = async () => {
      if (!response) return;

      try {
        await WebBrowser.dismissBrowser();

        if (response.type === 'success') {
          const { accessToken } = response.authentication || {};
          if (!accessToken) throw new Error('Access token missing');
          Alert.alert('Éxito', 'Autenticación completada');
        }
        else if (response.type === 'error') {
          Alert.alert('Error', response.error?.message);
        }
      } catch (error) {
        Alert.alert('Error', String(error));
        console.error('Auth error:', error);
      }
    };

    handleResponse();
  }, [response]);

  return (
    <CustomButton
      className="h-12 gap-2"
      title="Iniciar sesión con Google"
      onPress={() => { promptAsync() }}
      disabled={!request}
      iconRight={{ name: 'google', type: 'FontAwesome' }}
    />
  );
};
