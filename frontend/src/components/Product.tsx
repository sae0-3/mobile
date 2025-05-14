import { Image, Text, View } from 'react-native';

type ProductProps = {
  name: string;
  price: number;
  imgUrl: string;
};

export const Product = (product: ProductProps) => {
  const { name, price, imgUrl } = product;

  return (
    <View className="w-[238px] h-auto">
      <Image
        source={{ uri: imgUrl }}
        className="h-[175px] w-[237px] rounded-[39px] bg-slate-400"
      />

      <View className="flex flex-row justify-between">
        <Text className="w-[160px] text-[20px] font-['JejuGothic'] text-black">
          {name}
        </Text>
        <Text className="text-[20px] font-['JejuGothic'] text-black">
          {price}
        </Text>
      </View>

      <View className="flex justify-center items-center h-[25px] w-[123px] rounded-[16px] bg-[rgba(15,218,4,0.20)] my-2">
        <Text className="text-[14px] font-['Inter'] text-[#0FDA04]">
          Envío sin costo
        </Text>
      </View>
    </View>
  );
};
