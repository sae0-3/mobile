import React from 'react'
import { Image, View,Text } from 'react-native';
interface categoria{
    nombre:string;
}
function Categoria({ nombre }: categoria) {
  return (
    <View className="w-44 h-14 bg-black rounded-2xl items-center justify-center flex">
      <Text className="text-white text-lg font-normal font-['Jaro']">
        {nombre}
      </Text>
    </View>
  )
}

export default Categoria