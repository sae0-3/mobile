import { View } from 'react-native';
import { FilterType } from '../hooks/useFilter';
import { CustomButton } from './CustomButton';

interface Props {
  selected: FilterType;
  onChange: (value: FilterType) => void;
}

const OPTIONS: FilterType[] = ['Todos', 'Hoy', 'Semana', 'Mes'];

export const OrderDateFilter = ({ selected, onChange }: Props) => {
  return (
    <View className="flex-row justify-around flex-wrap gap-2">
      {OPTIONS.map((option) => (
        <CustomButton
          key={option}
          title={option}
          onPress={() => onChange(option)}
          className={`py-1 px-3 ${option === selected ? 'bg-primary text-white' : ''}`}
        />
      ))}
    </View>
  );
}
