import { Link, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons'
import { useLogin } from '../../src/hooks/useAuth';
import { useAuth } from '../../src/stores/auth';
import { Logo } from '../../assets/Logo';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { isAuthenticated, login, role } = useAuth();
  const { mutate, isPending, error } = useLogin();

  useEffect(() => {
    if (isAuthenticated && role) {
      router.replace(`/${role}/home`);
    }
  }, [isAuthenticated, role]);

  const handleLogin = () => {
    if (!email || !password) return;
    mutate({ email, password }, {
      onSuccess: (response) => {
        const token = response.data.access_token;
        login(token);
      }
    });
  };

  return (
    <KeyboardAvoidingView className="flex-1" enabled={true} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View className='flex-1 justify-center '>
        <View className="items-center justify-center mb-10 mt-10">
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
            selectionColor="#f2c558"
            textContentType="emailAddress"
            importantForAutofill="yes"
          />

          <View className="relative mb-4">
            <TextInput
              className="h-16 border border-gray-300 rounded-lg px-3"
              placeholder="Contraseña"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              selectionColor="#f2c558"
              textContentType="password"
              importantForAutofill="yes"
              autoCapitalize="none"
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-5 "
            >
              <Feather name={showPassword ? "eye-off" : "eye"} size={24} color="#9ca3af" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={handleLogin}
            disabled={isPending}
            className={`h-12 rounded-lg justify-center items-center ${isPending ? 'bg-gray-300' : 'bg-[#f2c558]'}`}
          >
            {isPending ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text className="text-white font-semibold text-base">Ingresar</Text>
            )}
          </TouchableOpacity>

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
    </KeyboardAvoidingView>
  );
}
