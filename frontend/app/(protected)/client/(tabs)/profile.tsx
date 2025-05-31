import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { CardLocations } from '../../../../src/components/CardLocations';
import { CardProfile } from '../../../../src/components/CardProfile';
import { Icon } from '../../../../src/components/Icon';
import { Loading } from '../../../../src/components/Loading';
import { useGetByIdClient } from '../../../../src/hooks/useClients';
import { useAuth } from '../../../../src/stores/auth';

export default function ProfileScreen() {
  const { id, logout } = useAuth();
  const { data, isLoading } = useGetByIdClient(String(id));

  const handleRemoveAccount = () => { };

  const handleLogout = () => {
    logout();
  };

  if (isLoading) return <Loading />;

  if (!data) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>No se encontro información</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View className="w-11/12 mx-auto py-5 gap-8">
        <CardProfile
          {...data.data}
          created_at={new Date(data.data.created_at)}
        />

        <CardLocations />

        <View className="flex-row justify-end items-center">
          {/* <TouchableOpacity
            className="bg-red-500 flex-row gap-2 rounded-lg p-2 items-center justify-center"
            onPress={handleRemoveAccount}
          >
            <Text className="text-white font-semibold">
              Eliminar Cuenta
            </Text>
            <Icon name="trash-alt" type="FontAwesome5" color="white" />
          </TouchableOpacity> */}

          <TouchableOpacity
            className="bg-primary flex-row gap-2 rounded-lg p-2 items-center justify-center"
            onPress={handleLogout}
          >
            <Text className="text-white font-semibold">
              Cerrar Sesión
            </Text>
            <Icon name="logout" type="MaterialIcons" color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
