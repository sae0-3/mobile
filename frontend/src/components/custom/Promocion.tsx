import React from 'react'
import { View,Text, Image } from 'react-native'
interface promocion{
    imagen:string;
    oferta:string;
}
function Promocion({imagen,oferta}:promocion) {
  return (
    <View className="w-72 h-48 relative rounded-[40px]">
        <Image className="w-72 h-48 left-0 top-0 absolute rounded-[40px]" source={{uri:imagen}} />
        <Text className="w-40 left-[33px] top-[54px] absolute justify-start text-white text-2xl font-normal font-['Chau_Philomene_One']">{oferta}</Text>
    </View>
  )
}

export default Promocion