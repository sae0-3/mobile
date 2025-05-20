import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator, SafeAreaView, FlatList } from 'react-native';
import { useGetByIdProduct } from '../../../../src/hooks/useProduct';
import { AddToCart } from '../../../../src/components/AddToCart';

export default function DetailScreen() {
  const params = useLocalSearchParams();
  // Aseguramos que productId sea un string único
  const productId = Array.isArray(params.productId) 
    ? params.productId[0] 
    : params.productId;
  
  const { data, isLoading } = useGetByIdProduct(productId);
  
  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#FF6B00" />
      </View>
    );
  }
  
  if (!data) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-gray-500">Producto no encontrado</Text>
      </View>
    );
  }
  
  const product = data.data;
  
  // Convertir los ingredientes en una lista (asumiendo que están separados por comas)
  const ingredientsList = product.ingredients
    .map(item => item.trim())
    .filter(item => item.length > 0);

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Imagen del producto */}
        <Image
          source={{ uri: product.img_reference }}
          className="h-64 w-full"
        />
        
        <View className="px-5 pt-4">
          {/* Información principal */}
          <View className="flex-row justify-between items-center mb-5">
            <Text className="text-xl font-semibold text-gray-800 mt-5">{product.name}</Text>
            <Text className="text-xl font-semibold text-yellow-500">Bs {product.price}</Text>
          </View>
 
          <Text className="text-gray-600 mb-6 leading-5">{product.description}</Text>

          <Text className="text-base font-medium text-gray-800 mb-2">Ingredientes</Text>
          <FlatList
            data={ingredientsList}
            keyExtractor={(item, index) => index.toString()}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <View className="flex-row items-center mb-1">
                <View className="h-1.5 w-1.5 rounded-full bg-orange-500 mr-2" />
                <Text className="text-gray-600">{item}</Text>
              </View>
            )}
            className="mb-6"
          />
          
          {/* Botón de añadir al carrito */}
          <View className="mb-8">
            <AddToCart 
              id={product.id} 
              name={product.name} 
              price={product.price} 
              imgUrl={product.img_reference} 
              available={product.available}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}