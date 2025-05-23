import React from 'react'
import { Text, View } from 'react-native'
import { useGetByIdOrder } from '../../../src/hooks/useClientOrders'
import { useLocalSearchParams } from 'expo-router';

function detailPedido() {
  const { orderId } = useLocalSearchParams();
  const data = useGetByIdOrder(String(orderId));
  return (
    <View>
      <Text>{data.data?.data.total} hola</Text>
      <Text>{data.data?.data.client_id} hola</Text>
    </View>
  )
}

export default detailPedido