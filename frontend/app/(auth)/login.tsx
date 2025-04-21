import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { useLogin } from '../../src/hooks/useAuth';
import { useAuth } from '../../src/stores/auth';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { isAuthenticated, login, role } = useAuth();
  const { mutate, isPending, error } = useLogin();

  useEffect(() => {
    if (isAuthenticated && role) {
      router.replace(`/${role}/home`);
    }
  }, [isAuthenticated, role]);

  const handleLogin = () => {
    mutate({ email, password }, {
      onSuccess: (response) => {
        const token = response.data.access_token;
        login(token);
      }
    });
  };

  return (
    <View className="flex-1 justify-center px-4">
      <Text className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</Text>

      <TextInput
        className="h-12 border border-gray-300 rounded-lg mb-4 px-3"
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        className="h-12 border border-gray-300 rounded-lg mb-4 px-3"
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title={isPending ? 'Cargando...' : 'Entrar'} onPress={handleLogin} disabled={isPending} />

      {error && (
        <Text className="text-blue-900 mt-4 text-center">
          {error.response?.data.message || "Error al iniciar sesión"}
        </Text>
      )}
    </View>
  );
}
