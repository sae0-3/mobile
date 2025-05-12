import { Text, View } from 'react-native';
import { useDeleteDealer } from '../hooks/useDealers';
import { Dealer } from '../types/apiTypes';
import { CustomButton } from './CustomButton';
import { Icon } from './Icon';

interface DealerItemProps {
  dealer: Dealer;
}

export const DealerItem = (props: DealerItemProps) => {
  const { id, email, vehicle } = props.dealer;
  const { mutate: remove, isPending } = useDeleteDealer(id);

  return (
    <View
      className="border-b border-b-gray-300 rounded flex-row justify-between py-3 items-center"
    >
      <View className="flex-row items-center gap-5">
        <Text>{email}</Text>
        <Icon
          name={vehicle}
          color='black'
          type='FontAwesome5'
        />
      </View>

      <CustomButton
        onPress={() => remove()}
        className="bg-transparent"
        iconRight={{
          name: 'trash-2',
          color: 'red',
        }}
        disabled={isPending}
      />
    </View>
  );
};
