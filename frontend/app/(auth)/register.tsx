import { useForm } from '@tanstack/react-form';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, Text, View } from 'react-native';
import { CustomButton } from '../../src/components/CustomButton';
import { FormTextField } from '../../src/components/FormTextField';
import { Icon } from '../../src/components/Icon';
import { ClientRegisterSchema, defaultValues } from '../../src/dtos/clientDto';
import { useRegister } from '../../src/hooks/useAuth';
import { useAuth } from '../../src/stores/auth';

export default function RegisterScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: register, isPending, data, error } = useRegister();
  const { isAuthenticated, login, role } = useAuth();

  useEffect(() => {
    if (isAuthenticated && role) {
      router.replace(`/${role}/home`)
    }
  }, [isAuthenticated, role])

  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      register(value, {
        onSuccess: (response) => {
          const token = response.data.access_token;
          login(token);
        }
      });
    },
    validators: {
      onChange: ClientRegisterSchema
    },
  });

  return (
    <KeyboardAvoidingView className="flex-1" enabled={true} behavior={Platform.OS == "ios" ? "padding" : "height"}>
      <View className="flex-1 justify-center">
        <View className="w-10/12 mx-auto flex gap-4">
          <Text className="text-2xl font-bold mb-6 text-center">Crear Cuenta</Text>

          <View className="flex-row items-center border-b border-gray-300 px-3 py-2">
            <Icon name="user" color="black" />
            <FormTextField
              form={form}
              name="name"
              className="flex-1 ml-3"
              inputProps={{
                placeholder: 'Nombre *',
                textContentType: 'name',
              }}
              required
            />
          </View>

          <View className="flex-row items-center border-b border-gray-300 px-3 py-2">
            <Icon name="mail" color="black" />
            <FormTextField
              form={form}
              name="email"
              className="flex-1 ml-3"
              inputProps={{
                placeholder: 'Correo Electrónico *',
                keyboardType: 'email-address',
                autoCapitalize: 'none',
                textContentType: 'emailAddress',
              }}
              required
            />
          </View>

          <View className="flex-row items-center border-b border-gray-300 px-3 py-2">
            <Icon name="lock" color="black" />
            <FormTextField
              form={form}
              name="password"
              className="flex-1 ml-3"
              secureTextEntry={!showPassword}
              inputProps={{
                placeholder: 'Contraseña *',
                autoCapitalize: 'none',
                textContentType: 'password',
              }}
            />
            <CustomButton
              className="bg-transparent py-2"
              onPress={() => setShowPassword(!showPassword)}
              iconRight={{ name: showPassword ? 'eye' : 'eye-off', color: '#9ca3af' }}
            />
          </View>

          <View className="flex-row items-center border-b border-gray-300 px-3 py-2">
            <Icon name="phone" color="black" />
            <FormTextField
              form={form}
              name="phone"
              className="flex-1 ml-3"
              inputProps={{
                placeholder: 'Número de celular',
                keyboardType: 'phone-pad',
                textContentType: 'telephoneNumber',
              }}
            />
          </View>

          <CustomButton
            onPress={form.handleSubmit}
            title="Registrarse"
            className="h-12"
            disabled={isPending}
            loading={isPending}
          />

          {error && <Text className="text-red-500 text-center">{error.response?.data.message || 'Error'}</Text>}
          {data && <Text className="text-green-600 text-center">Se creo la cuenta con exito!</Text>}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
