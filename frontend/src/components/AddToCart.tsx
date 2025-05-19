import { Text, TouchableOpacity, View } from 'react-native';
import { useCartStore } from '../stores/order';
import { Icon } from './Icon';

type AddToCartProps = {
  id: string;
  name: string;
  price: number;
  imgUrl: string;
  available: boolean;
};

export const AddToCart = (props: AddToCartProps) => {
  const { id, name, price, imgUrl, available } = props;
  const { addItem, updateQuantity, removeItem, findItem } = useCartStore();
  const cartItem = findItem(id);
  const quantity = cartItem?.quantity || 0;

  const handleAddToCart = () => {
    if (!available) return;
    addItem({ product: { id, name, price, img_reference: imgUrl } });
  };

  const handleIncrement = () => updateQuantity(props.id, quantity + 1);

  const handleDecrement = () => {
    if (quantity <= 1) {
      removeItem(props.id);
    } else {
      updateQuantity(props.id, quantity - 1);
    }
  };

  if (!available) {
    return (
      <View className="bg-red-200 items-center justify-center p-2 rounded-xl opacity-50">
        <Text>No disponible</Text>
      </View>
    );
  }

  return !!quantity ? (
    <View className="flex-row items-center justify-between">
      <TouchableOpacity
        className="border border-primary items-center justify-center p-px rounded-md"
        onPress={handleDecrement}
      >
        <Icon name="minus" />
      </TouchableOpacity>

      <Text className="font-medium text-lg">
        {cartItem?.quantity}
      </Text>

      <TouchableOpacity
        className="border border-primary items-center justify-center p-px rounded-md"
        onPress={handleIncrement}
      >
        <Icon name="plus" />
      </TouchableOpacity>
    </View>
  ) : (
    <TouchableOpacity
      className="flex-row border border-primary items-center justify-center p-px rounded-xl disabled:opacity-50"
      disabled={!available}
      onPress={handleAddToCart}
    >
      <Text className="text-primary">
        Añadir
      </Text>
      <Icon name="plus" />
    </TouchableOpacity>
  );
};
