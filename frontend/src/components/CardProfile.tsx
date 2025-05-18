import { Text, TouchableOpacity, View } from 'react-native';
import { Icon } from './Icon';

type CardProfileProps = {
  name: string;
  email: string;
  phone: string | null;
  created_at: Date;
};

export const CardProfile = (props: CardProfileProps) => {
  const handleEditProfile = () => { };

  return (
    <View className="bg-gray-50 shadow-lg shadow-black p-4 rounded-xl gap-2">
      <View className="flex-row gap-5 items-center">
        <Icon name="user-circle-o" size={60} type="FontAwesome" />

        <View className="gap-2">
          <Text>
            {props.name}
          </Text>
          <Text>
            {props.email}
          </Text>
          <Text>
            {props.phone}
          </Text>
        </View>
      </View>

      <View className="flex-row justify-between items-center">
        <View className="gap-px">
          <Text>Se unió en:</Text>
          <Text>
            {props.created_at.toLocaleDateString('es-ES', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </Text>
        </View>

        <TouchableOpacity
          className="border border-primary p-3 rounded-lg disabled:opacity-50"
          onPress={handleEditProfile}
          disabled
        >
          <Text className="text-primary">Editar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
