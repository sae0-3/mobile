import { ScrollView, Text, View } from 'react-native';
import { FooterListOrder } from '../../../src/components/FooterListOrder';
import { HeaderListOrder } from '../../../src/components/HeaderListOrder';
import { ItemListOrder } from '../../../src/components/ItemListOrder';
import { WarningMessage } from '../../../src/components/WarningMessage';
import { useGetByIdClient } from '../../../src/hooks/useClients';
import { useGetAllLocations } from '../../../src/hooks/useLocations';
import { useAuth } from '../../../src/stores/auth';
import { useCartStore } from '../../../src/stores/order';

export default function CartScreen() {
  const { items } = useCartStore();
  const { id } = useAuth();
  const { data: user, isLoading: isLoadingPhone } = useGetByIdClient(String(id));
  const { data: locations, isLoading: isLoadingLocations } = useGetAllLocations();

  const isPhoneRegistered = !!user?.data.phone;
  const isLocationsRegistered = !!locations?.data.length;

  if (items.length === 0) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-xl text-gray-500 italic">
          No existen productos en el carrito
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
    >
      <View className="mx-auto w-11/12 mt-4 mb-6 gap-4">
        {!isPhoneRegistered && !isLoadingPhone && (
          <WarningMessage
            message="No tiene ningún número registrado"
          />
        )}

        {!isLocationsRegistered && !isLoadingLocations && (
          <WarningMessage
            message="No tiene ninguna ubicación registrada"
          />
        )}

        <HeaderListOrder />

        <View className="gap-4 py-4 border-y border-y-gray-200">
          {items.map(({ product }) => (
            <ItemListOrder
              key={product.id}
              {...product}
            />
          ))}
        </View>

        <FooterListOrder
          disabled={!isPhoneRegistered || !isLocationsRegistered}
        />
      </View>
    </ScrollView>
  );
}
