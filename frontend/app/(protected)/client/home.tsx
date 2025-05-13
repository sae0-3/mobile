import { router } from 'expo-router';
import { Button, SafeAreaView, ScrollView, Text, View, Image } from 'react-native';
import { useAuth } from '../../../src/stores/auth';
import Promocion from '../../../src/components/custom/Promocion';
import React from 'react';
import Categoria from '../../../src/components/custom/Categoria';
import SliderPlatoItem from '../../../src/components/custom/SliderPlatoItem';
import { useGetAllCategories } from '../../../src/hooks/useCategories';
import { useGetAllProducts } from '../../../src/hooks/useProduct';

export default function HomeScreen() {
  const { logout } = useAuth();
  const { data, isLoading, error } = useGetAllCategories();

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };
  return (
    <SafeAreaView className="flex gap-5 py-3 px-1">
      <View className="flex flex-row justify-between">
        <Text className="justify-start text-black text-3xl font-normal font-['Jaro']">Pedidos</Text>
        <View className="flex flex-row gap-4">
          <Image source={{ uri: "https://cdn-icons-png.flaticon.com/128/2331/2331970.png" }} className="w-14 h-14" />
          <Image source={{ uri: "https://cdn-icons-png.flaticon.com/128/3135/3135715.png" }} className="w-14 h-14" />
        </View>
      </View>

      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal={true}
      >
        <View className="flex flex-row gap-3 mx-2">
          {
            data?.data.map((categoria, index) =>
              <Categoria nombre={categoria.name} key={categoria.id} />
            )
          }
        </View>
      </ScrollView>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal={false}
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingBottom: 200, // Esto da espacio para que el último elemento sea visible
        }}
      >
        {
          data?.data.map((categoria) =>
            <SliderPlatoItem id={categoria.id} nameCategoria={categoria.name} key={categoria.id} />
          )
        }
      </ScrollView>
    </SafeAreaView>
  );
}
