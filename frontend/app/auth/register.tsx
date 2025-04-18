import { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { useRegister } from '../../src/hooks/useAuth';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { mutate: register, isPending, data, error } = useRegister();

  const handleRegister = () => {
    register({ email, password });
  };

  return (
    <View>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Register" onPress={handleRegister} disabled={isPending} />

      {error && <Text className="text-red-300">{error.response?.data.message || 'Error'}</Text>}
      {data && <Text className="text-green-300">Se creo la cuenta con exito!</Text>}
    </View>
  );
}
