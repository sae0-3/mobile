import RescueMemo from "../../assets/Rescue";
import { View, Text } from "react-native";

export default function Logo() {
    return (
        <View className="flex flex-row items-center justify-center">
            <View>
                <Text className="text-[28px] font-black tracking-wider text-primary mr-1 mb-[-8px] mt-[4px]">RESCUE</Text>
                <Text className="text-[42px] font-black tracking-wider text-primary mr-1">FOOD</Text>
            </View>
            <RescueMemo width={105} height={105}/>
        </View>
    )
}