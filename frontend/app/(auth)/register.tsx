import { useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons'

import { useRegister } from '../../src/hooks/useAuth';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errors, setErrors] = useState({ name: '', email: '', password: '', phoneNumber: '' })

  const { mutate: register, isPending, data, error } = useRegister();

  const handleRegister = () => {
    const newErrors = {
      name: name.trim() ? '' : 'El nombre es obligatorio',
      email: email.trim() ? '' : 'El correo electronico es obligatorio',
      password: password.trim() ? '' : 'La contraseña es obligatorio',
      phoneNumber: phoneNumber.trim() ? '' : 'El numero de celular el obligatorio'
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((e) => e !== '');
    if (hasErrors) return;
    register({ email, password });
  };

  return (
    <KeyboardAvoidingView className="flex-1" enabled={true} behavior={Platform.OS == "ios" ? "padding" : "height"}>
      <View className="flex-1 justify-center">
        <View className="w-10/12 mx-auto flex gap-4">

          <Text className="text-2xl font-bold mb-6 text-center" > Crear Cuenta </Text>
          <View>
            <View className="flex-row items-center border-b border-gray-300 h-16 px-3">
              <Feather name="user" size={24} color="black" />
              <TextInput
                className="flex-1 ml-3"
                placeholder="Nombre"
                value={name}
                onChangeText={text => {
                  setName(text);
                  if (text.trim()) setErrors(prev => ({ ...prev, name: '' }));
                }}
                textContentType="name"
              />
            </View>
            {errors.name !== '' && <Text className="text-red-500 mt-1 ml-2">{errors.name}</Text>}
          </View>
          <View>

            <View className="flex-row items-center border-b border-gray-300 h-16 px-3">
              <Feather name="mail" size={24} color="black" />
              <TextInput
                className="flex-1 ml-3"
                placeholder="Email"
                value={email}
                onChangeText={text => {
                  setEmail(text);
                  if (text.trim()) setErrors(prev => ({ ...prev, email: '' }));
                }}
                selectionColor="#f2c558"
                textContentType="emailAddress"
                importantForAutofill="yes"
              />
            </View>
            {errors.email !== '' && <Text className="text-red-500 mt-1 ml-2">{errors.email}</Text>}
          </View>

          <View>
            <View className="flex-row items-center border-b border-gray-300 h-16 px-3">
              <Feather name="lock" size={24} color="black" />
              <TextInput
                className="flex-1 ml-3"
                placeholder="Contraseña"
                value={password}
                onChangeText={text => {
                  setPassword(text);
                  if (text.trim()) setErrors(prev => ({ ...prev, password: '' }));
                }}
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
            {errors.password !== '' && <Text className="text-red-500 mt-1 ml-2">{errors.password}</Text>}
          </View>

          <View>
            <View className="flex-row items-center border-b border-gray-300 h-16 px-3">
              <Feather name="phone" size={24} color="black" />
              <TextInput
                className="flex-1 ml-3"
                placeholder="Número de celular"
                value={phoneNumber}
                onChangeText={text => {
                  setPhoneNumber(text);
                  if (text.trim()) setErrors(prev => ({ ...prev, phoneNumber: '' }));
                }}
              />
            </View>
            {errors.phoneNumber !== '' && <Text className="text-red-500 mt-1 ml-2">{errors.phoneNumber}</Text>}
          </View>

          <TouchableOpacity
            onPress={handleRegister}
            disabled={isPending}
            className={`h-12 rounded-lg justify-center items-center ${isPending ? 'bg-gray-300' : 'bg-[#f2c558]'}`}
          >
            {isPending ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text className="text-white font-semibold text-base">
                Registrarse
              </Text>
            )}
          </TouchableOpacity>

          {error && <Text className="text-red-500 text-center">{error.response?.data.message || 'Error'}</Text>}
          {data && <Text className="text-green-600 text-center">Se creo la cuenta con exito!</Text>}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
