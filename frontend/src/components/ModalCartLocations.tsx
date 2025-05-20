import { useEffect, useState } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useCreateOrder } from '../hooks/useClientOrders';
import { useCartStore } from '../stores/order';

type ModalCartLocationsProps = {
  options: { value: string, label: string }[];
  visible: boolean;
  onClose: () => void;
};

export const ModalCartLocations = (props: ModalCartLocationsProps) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const { mutate: createOrder, isPending, isSuccess } = useCreateOrder();
  const { items: itemsCart, getTotal, getSubtotal, clearCart } = useCartStore();
  const items = itemsCart.map(({ product, quantity }) => {
    return {
      product_id: product.id,
      quantity,
      subtotal: getSubtotal(product.id),
    };
  });

  useEffect(() => {
    if (isSuccess) {
      props.onClose();
      clearCart();
    }
  }, [isSuccess, isPending, createOrder])

  const handleConfirm = () => {
    createOrder({
      total: getTotal(),
      user_address_id: String(selectedValue),
      items,
    });
  };

  return (
    <Modal
      transparent
      visible={props.visible}
      animationType="fade"
    >
      <View className="flex-1 justify-center items-center bg-black/40">
        <View className="bg-white rounded-lg w-11/12 max-w-md p-4">
          <Text className="text-xl font-semibold text-center mb-4">
            Seleccione la ubicación
          </Text>

          <View className="my-2">
            <RNPickerSelect
              value={selectedValue}
              onValueChange={setSelectedValue}
              items={props.options}
              placeholder={{ label: 'Presiona para seleccionar...', value: null, color: 'gray' }}
              useNativeAndroidPickerStyle={false}
            />
          </View>

          <View className="flex-row justify-between mt-4">
            <TouchableOpacity
              onPress={props.onClose}
              className="px-4 py-2 border border-red-500 rounded-lg"
            >
              <Text className="text-red-500">Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleConfirm}
              className="px-4 py-2 rounded-lg border border-primary disabled:opacity-40"
              disabled={!selectedValue || isPending}
            >
              <Text className="text-primary">Realizar Pedido</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
