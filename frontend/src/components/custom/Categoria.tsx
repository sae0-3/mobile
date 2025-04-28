import React from 'react'
import { Image, View,Text } from 'react-native';
interface categoria{
    imagen:string;
    nombre:string;
}
function Categoria({imagen,nombre}:categoria) {
  return (
    <View className="w-44 h-14 relative">
        <View className="w-44 h-14 left-0 top-0 absolute bg-zinc-300/70 rounded-[35px]" />
        <Image source={{uri:imagen}} className="w-11 h-11 left-[23.67px] top-[6.61px] absolute"/>
        <Text className="w-24 h-8 left-[72.02px] top-[12px] absolute justify-start text-black text-lg font-normal font-['Jaro']">{nombre}</Text>
    </View>
  )
}

export default Categoria