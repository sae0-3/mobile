import { useForm } from '@tanstack/react-form';
import { Link, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, Text, View } from 'react-native';
import { Logo } from '../../assets/Logo';
import { CustomButton } from '../../src/components/CustomButton';
import { FormTextField } from '../../src/components/FormTextField';
import { Icon } from '../../src/components/Icon';
import { useLogin } from '../../src/hooks/useAuth';
import { useAuth } from '../../src/stores/auth';
import { GoogleLoginButton } from '../../src/components/GoogleLoginButton';

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { isAuthenticated, login, role } = useAuth();
  const { mutate, isPending, error } = useLogin();
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      mutate(value, {
        onSuccess: (response) => {
          const token = response.data.access_token;
          login(token);
        }
      });
    },
  });

  useEffect(() => {
    if (isAuthenticated && role) {
      router.replace(`/${role}/home`);
    }
  }, [isAuthenticated, role]);

  return (
    <KeyboardAvoidingView className="flex-1" enabled={true} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View className="flex-1 justify-center" >
        <View className="items-center justify-center mb-10 mt-10">
          <Logo width="180" height="180" />
        </View>

        <View className="w-10/12 mx-auto flex gap-4">
          <Text className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</Text>

          <View className="flex-row items-center border-b border-gray-300 h-16 px-3">
            <Icon name="mail" color="black" />
            <FormTextField
              form={form}
              className="flex-1 ml-3"
              name="email"
              inputProps={{
                placeholder: 'Correo Electrónico',
                textContentType: 'emailAddress',
                keyboardType: 'email-address',
                importantForAutofill: 'yes',
                autoCapitalize: 'none',
              }}
            />
          </View>

          <View className="flex-row items-center border-b border-gray-300 h-16 px-3">
            <Icon name="lock" color="black" />
            <FormTextField
              form={form}
              name="password"
              className="flex-1 ml-3"
              secureTextEntry={!showPassword}
              inputProps={{
                placeholder: 'Contraseña',
                textContentType: 'password',
                autoCapitalize: 'none',
              }}
            />
            <CustomButton
              className="bg-transparent py-2"
              onPress={() => setShowPassword(!showPassword)}
              iconRight={{ name: showPassword ? 'eye' : 'eye-off', color: '#9ca3af' }}
            />
          </View>

          <CustomButton
            title="Ingresar"
            onPress={form.handleSubmit}
            disabled={isPending}
            className="h-12"
            loading={isPending}
          />

          {error && (
            <Text className="text-red-500 text-center">
              {error.response?.data.message || "Error al iniciar sesión"}
            </Text>
          )}

          <GoogleLoginButton />

          <Text className="text-center">
            ¿No tienes una cuenta? <Link href="/register" className="text-primary">Regístrate</Link>
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
