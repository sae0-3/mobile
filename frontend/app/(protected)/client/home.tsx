import { router } from 'expo-router';
import { Button, SafeAreaView, ScrollView, Text, View,Image } from 'react-native';
import { useAuth } from '../../../src/stores/auth';
import Promocion from '../../../src/components/custom/Promocion';
import React from 'react';
import Categoria from '../../../src/components/custom/Categoria';
import SliderPlatoItem from '../../../src/components/custom/SliderPlatoItem';

export default function HomeScreen() {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };
  const Promociones=[
    {
      imagen:'https://sdmntprnorthcentralus.oaiusercontent.com/files/00000000-ad5c-622f-b7ab-6ef5e9b78b33/raw?se=2025-04-28T01%3A25%3A52Z&sp=r&sv=2024-08-04&sr=b&scid=b5236b8a-0e03-5b16-9cee-18fc5480933a&skoid=d958ec58-d47c-4d2f-a9f2-7f3e03fdcf72&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-04-27T14%3A48%3A41Z&ske=2025-04-28T14%3A48%3A41Z&sks=b&skv=2024-08-04&sig=i5%2BepMIdsvYlHvVGfd6yDt8hpXsTKWVtlf24IZC%2B%2B/s%3D',
      nombre: 'OFERTAS LOS FINES DE SEMANA'
    },
    {
      imagen:'https://sdmntprnorthcentralus.oaiusercontent.com/files/00000000-ca04-622f-ad93-586e8ec87555/raw?se=2025-04-28T01%3A23%3A58Z&sp=r&sv=2024-08-04&sr=b&scid=539370ba-88da-58af-8437-bf37133980e6&skoid=d958ec58-d47c-4d2f-a9f2-7f3e03fdcf72&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-04-27T10%3A56%3A51Z&ske=2025-04-28T10%3A56%3A51Z&sks=b&skv=2024-08-04&sig=VGqeoV4e8CS61kVblWB%2BapG40OlLngYCsj8LqnhcF68%3D',
      nombre: 'SEGUNDOS RICOS'
    },
    {
      imagen:'https://sdmntprnorthcentralus.oaiusercontent.com/files/00000000-4624-622f-9a56-770dc624722a/raw?se=2025-04-28T01%3A24%3A23Z&sp=r&sv=2024-08-04&sr=b&scid=24514d71-eeba-56d8-ae7b-71dbb4d25e61&skoid=d958ec58-d47c-4d2f-a9f2-7f3e03fdcf72&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-04-27T14%3A37%3A41Z&ske=2025-04-28T14%3A37%3A41Z&sks=b&skv=2024-08-04&sig=pnpo37OCqYz7sMbXfaNxVhKo5NvE2mOlC5wMxm4KR4o%3D',
      nombre: 'COMPRA 10 ALMUERZOS + 1 ALMUERZO GRATIS'
    },
  ];
  
  const categorias=[
    {
      imagen:'https://cdn-icons-png.flaticon.com/128/1037/1037762.png',
      nombre: 'Almuerzo'
    },
    {
      imagen:'https://cdn-icons-png.flaticon.com/128/938/938063.png',
      nombre: 'Helado'
    },
    {
      imagen:'https://cdn-icons-png.flaticon.com/128/2722/2722532.png',
      nombre: 'Refresco'
    },
    {
      imagen:'https://cdn-icons-png.flaticon.com/128/4508/4508313.png',
      nombre: 'Dulces'
    }
  ];
  const dishes = [
    {
      id: '1',
      name: 'Tacos al Pastor',
      image: 'https://sdmntprnorthcentralus.oaiusercontent.com/files/00000000-c43c-622f-9dc1-1745ae8b4dae/raw?se=2025-04-28T02%3A34%3A00Z&sp=r&sv=2024-08-04&sr=b&scid=342197f3-9589-5463-ba1d-227017580645&skoid=d958ec58-d47c-4d2f-a9f2-7f3e03fdcf72&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-04-27T14%3A49%3A37Z&ske=2025-04-28T14%3A49%3A37Z&sks=b&skv=2024-08-04&sig=KggKq0kkiJTfg3pGog7TulNDix9Q2t2wDOrOWbdUQwg%3D',
      price: 'Bs 25',
      prepTime: '15 min',
    },
    {
      id: '2',
      name: 'Sushi de Salmón',
      image: 'https://sdmntprnorthcentralus.oaiusercontent.com/files/00000000-87b8-622f-9c2a-0f5c76daf49a/raw?se=2025-04-28T02%3A34%3A31Z&sp=r&sv=2024-08-04&sr=b&scid=d33e4172-fe70-5221-9038-6fc3682a9d60&skoid=d958ec58-d47c-4d2f-a9f2-7f3e03fdcf72&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-04-27T10%3A56%3A53Z&ske=2025-04-28T10%3A56%3A53Z&sks=b&skv=2024-08-04&sig=Rg%2Bw1IVC3q6a1f7g3cFfcaZbqf4Mvi%2B/sP0ehXBHM04%3D',
      price: 'Bs 60',
      prepTime: '25 min',
    },
    {
      id: '3',
      name: 'Pizza Margarita',
      image: 'https://sdmntprnorthcentralus.oaiusercontent.com/files/00000000-8b30-622f-82f8-ad8ea4b9c1d3/raw?se=2025-04-28T02%3A35%3A05Z&sp=r&sv=2024-08-04&sr=b&scid=fc52d395-d46b-5c6a-aef8-f86e39ce72fb&skoid=d958ec58-d47c-4d2f-a9f2-7f3e03fdcf72&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-04-27T14%3A37%3A20Z&ske=2025-04-28T14%3A37%3A20Z&sks=b&skv=2024-08-04&sig=eEHuLHMdCYmq8JcT0r0PBay6i11D8gw1JLk3/qgXQhQ%3D',
      price: 'Bs 40',
      prepTime: '20 min',
    },
    {
      id: '4',
      name: 'Ramen Tonkotsu',
      image: 'https://sdmntprnorthcentralus.oaiusercontent.com/files/00000000-9710-622f-b8ff-5501c35bc9b7/raw?se=2025-04-28T01%3A41%3A29Z&sp=r&sv=2024-08-04&sr=b&scid=ed88f05b-a7e0-5464-8d82-ef72c13ad2d4&skoid=d958ec58-d47c-4d2f-a9f2-7f3e03fdcf72&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-04-27T21%3A20%3A10Z&ske=2025-04-28T21%3A20%3A10Z&sks=b&skv=2024-08-04&sig=1385X%2B7wYj7fWB9uGloj/EMe1b39qE3BfQInUC9W6cg%3D',
      price: 'Bs 55',
      prepTime: '30 min',
    },
    {
      id: '5',
      name: 'Hamburguesa Clásica',
      image: 'https://sdmntprnorthcentralus.oaiusercontent.com/files/00000000-890c-622f-9d86-b59d571b2170/raw?se=2025-04-28T02%3A36%3A55Z&sp=r&sv=2024-08-04&sr=b&scid=0ec06731-58b0-52eb-89bf-3bbe9d93a7c8&skoid=d958ec58-d47c-4d2f-a9f2-7f3e03fdcf72&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-04-27T14%3A49%3A23Z&ske=2025-04-28T14%3A49%3A23Z&sks=b&skv=2024-08-04&sig=NYNHsNI9FbS2hrW/G0As8w7/I4SudhHxZiVD9r2zK7Y%3D',
      price: 'Bs 35',
      prepTime: '18 min',
    },
    {
      id: '6',
      name: 'Ensalada César',
      image: 'https://sdmntprnorthcentralus.oaiusercontent.com/files/00000000-46b8-622f-bddb-96281442069d/raw?se=2025-04-28T02%3A37%3A36Z&sp=r&sv=2024-08-04&sr=b&scid=89852ea7-51fd-5075-b36d-d58245bda647&skoid=d958ec58-d47c-4d2f-a9f2-7f3e03fdcf72&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-04-27T14%3A42%3A00Z&ske=2025-04-28T14%3A42%3A00Z&sks=b&skv=2024-08-04&sig=hqbnrovqX382Eq5QIt2q4iv0kMs6Q%2BiB5t1gkKKo4ek%3D',
      price: 'Bs 28',
      prepTime: '10 min',
    },
  ];
  return (
    <SafeAreaView className="flex gap-5">
      <View className="flex flex-row justify-between">
        <Text className="justify-start text-black text-3xl font-normal font-['Jaro']">Pedidos</Text>
        <View className="flex flex-row gap-4">
          <Image source={{uri:"https://cdn-icons-png.flaticon.com/128/2331/2331970.png"}} className="w-14 h-14"/>
          <Image source={{uri:"https://cdn-icons-png.flaticon.com/128/3135/3135715.png"}} className="w-14 h-14" />
        </View> 
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal={true}
      >
          <View className="flex flex-row gap-3 mx-2">
            {
              Promociones.map((promocion,index)=>
                <Promocion key={index} imagen={promocion.imagen} oferta={promocion.nombre}/>
              )
            }
          </View>
      </ScrollView>

      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal={true}
      >
        <View className="flex flex-row gap-3 mx-2">
          {
            categorias.map((categoria,index)=>
              <Categoria imagen={categoria.imagen} nombre={categoria.nombre} key={index}/>
            )
          }
        </View>
      </ScrollView>
      <Text className="px-3 justify-start text-zinc-800 text-3xl font-normal font-['Chau_Philomene_One']">SEGUNDOS SUELTOS</Text>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal={true}
      >
        <View className="flex flex-row gap-3 mx-2">
          {
            dishes.map((plato,index)=>
              <SliderPlatoItem key={index} nombre={plato.name} image={plato.image} price={plato.price} prepTime={plato.prepTime} />
            )
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
