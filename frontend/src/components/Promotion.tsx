import { Image, Text, View } from 'react-native';

type PromotionProps = {
  imgUrl: string;
  ofert: string;
};

export const Promotion = (promotion: PromotionProps) => {
  const { imgUrl, ofert } = promotion;

  return (
    <View className="w-72 h-48 relative rounded-[40px]">
      <Image
        className="w-72 h-48 left-0 top-0 absolute rounded-[40px]"
        source={{ uri: imgUrl }}
      />

      <Text
        className="w-40 left-[33px] top-[54px] absolute justify-start text-white text-2xl font-normal font-['Chau_Philomene_One']"
      >
        {ofert}
      </Text>
    </View>
  );
};
