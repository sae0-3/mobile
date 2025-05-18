import { FlatList, Text, View } from 'react-native';
import { FooterListOrder } from '../../../../src/components/FooterListOrder';
import { HeaderListOrder } from '../../../../src/components/HeaderListOrder';
import { ItemListOrder } from '../../../../src/components/ItemListOrder';
import { useCartStore } from '../../../../src/stores/order';

export default function OrdersScreen() {
  const { items } = useCartStore();

  if (items.length === 0) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg font-medium">
          No existen productos en el carrito
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      className="mx-auto w-11/12 my-6"
      data={items}
      keyExtractor={(item) => item.product.id}
      ListHeaderComponent={() => <HeaderListOrder />}
      ListFooterComponent={() => <FooterListOrder />}
      renderItem={({ item: { product } }) => <ItemListOrder {...product} />}
      contentContainerStyle={{
        gap: 10,
      }}
    />
  );
}
