import { Link, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { useLogin } from '../../src/hooks/useAuth';
import { useAuth } from '../../src/stores/auth';
import { Logo } from '../../assets/Logo';

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
    <View className='flex-1 justify-center'>
      <View className="items-center justify-center mb-10">
        <Logo width="180" height="180" />
      </View>

      <View className="w-10/12 mx-auto flex gap-4">
        <Text className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</Text>
        <TextInput
          className="h-16 border border-gray-300 rounded-lg px-3"
          placeholder="Correo electrónico"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          className="h-16 border border-gray-300 rounded-lg px-3"
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Button title={isPending ? 'Cargando...' : 'Ingresar'} onPress={handleLogin} disabled={isPending} />

        {error && (
          <Text className="text-red-500 text-center">
            {error.response?.data.message || "Error al iniciar sesión"}
          </Text>
        )}

        <Text className="text-center">
          ¿No tienes una cuenta? <Link href="/register" className="text-cyan-600">Regístrate</Link>
        </Text>
      </View>
    </View>
  );
}
