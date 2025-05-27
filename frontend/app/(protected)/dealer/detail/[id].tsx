import { useLocalSearchParams } from 'expo-router';
import { Text, View, Image } from 'react-native'
import { useGetDealerOrder } from '../../../../src/hooks/useDealers';
import { useOrderLocation } from '../../../../src/hooks/useDelivery';

export default function detailorder() {
    const { id } = useLocalSearchParams();
    const { data, error, isLoading } = useGetDealerOrder(id.toString())
    const orders = data?.data;
    const {data:data1,error:error1,isLoading:isLoading1 } = useOrderLocation(id.toString())
    const locate = data1?.data;
    if (!id || typeof id !== 'string') return <Text>ID inválido</Text>;
    if (isLoading) return <Text>Cargando...</Text>;
    if (error) return <Text>Error al cargar la orden</Text>;
    if (!orders) return <Text>No se encontró la orden</Text>;

    return (
        <View className="p-4 m-4 bg-white rounded-xl shadow-md">
            {/* Usuario */}
            <View className="flex-row gap-3 items-center space-x-4">
                <Image
                    source={{ uri: 'https://cdn-icons-png.flaticon.com/128/1144/1144709.png' }}
                    className="w-16 h-16 rounded-full bg-gray-200"
                />
                <View>
                    <Text className="text-base"><Text className='font-semibold'>Nombre:</Text>{orders.client_name}</Text>
                    <Text className="text-base"><Text className='font-semibold'>Telefono:</Text>  {orders.client_phone}</Text>
                    <Text className="text-base"><Text className='font-semibold'>Ubicacion:</Text> {locate?.client_address}</Text>
                </View>
            </View>

            {/* Productos */}
            <View>
                <Text className="text-lg font-semibold mb-2">Productos</Text>
                {orders.products.map((product, index) => (
                    <View key={index} className="flex-row justify-between mb-1">
                        <Text className="text-sm">{product.name}</Text>
                        <Text className="text-sm font-medium">
                            x{product.quantity} — Bs {product.subtotal}
                        </Text>
                    </View>
                ))}
            </View>

            {/* Total */}
            <Text className="text-right text-base font-bold">Total: {orders.total}</Text>
        </View>
    )
}
