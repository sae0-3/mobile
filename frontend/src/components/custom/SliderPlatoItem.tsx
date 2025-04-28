import React from 'react'
import {Text, View,Image } from "react-native";
interface Plato{
    nombre:string;
    image: string;
    price: string;
    prepTime: string;
}
function SliderPlatoItem({nombre,image,price,prepTime,}:Plato) {
  return (
        <View className="w-[238px] h-auto">
            <Image
                source={{uri:image}}
                className="h-[175px] w-[237px] rounded-[39px]"
            />
            <View className="flex flex-row justify-between">
                <Text className="w-[160px] text-[20px] font-['JejuGothic'] text-black">
                    {nombre}
                </Text>
                <Text className="text-[20px] font-['JejuGothic'] text-black">
                    {price}
                </Text>
            </View>
                <Text className="text-[14px] font-['Inter'] text-black">
                    {prepTime}
                </Text>
            <View className="flex justify-center items-center h-[25px] w-[123px] rounded-[16px] bg-[rgba(15,218,4,0.20)] my-2">
                <Text className="text-[14px] font-['Inter'] text-[#0FDA04]">
                    Envío sin costo
                </Text>
            </View>
        </View>
  )
}
export default SliderPlatoItem