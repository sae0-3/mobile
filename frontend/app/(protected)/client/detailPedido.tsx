import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useGetByIdOrder } from '../../../src/hooks/useClientOrders';
import StatusBadge from '../../../src/components/StatusBadge';
import ProductItem from '../../../src/components/ProductItem';

const detailPedido = () => {
  const { orderId } = useLocalSearchParams();
  const { data, isLoading, error } = useGetByIdOrder(String(orderId));
  const order = data?.data;

  if (isLoading) return <Text className="text-center mt-4">Cargando...</Text>;
  if (error) return <Text className="text-center mt-4 text-red-500">Error al cargar el pedido</Text>;

  return (
    <ScrollView className="flex-1 bg-white px-4 py-6">
      <View className="mb-6">
        {/* Encabezado del pedido */}
        <Text className="text-lg font-semibold text-primary mb-4">Total: {order?.total} Bs</Text>

        {/* Estado del pedido */}
        <StatusBadge status={order?.status || 'pending'} />
      </View>

      {/* Lista de productos */}
      {order?.items.map((items, index) => (
        <ProductItem imagen={items.product.img_reference||''} name={items.product.name} price={items.product.price} cantidad={items.quantity} key={index}/>
      ))}
    </ScrollView>
  );
};

export default detailPedido;
