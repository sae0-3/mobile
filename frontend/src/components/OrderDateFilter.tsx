import { View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { FilterType } from '../hooks/useFilter';

interface Props {
  selected: FilterType;
  onChange: (value: FilterType) => void;
}

const OPTIONS: FilterType[] = ['Hoy', 'Semana', 'Mes', 'Todos'];

export const OrderDateFilter = ({ selected, onChange }: Props) => {
  return (
    <View className="border-2 border-primary rounded-lg">
      <RNPickerSelect
        value={selected}
        onValueChange={(value) => onChange(value)}
        placeholder={{ label: 'Seleccionar filtro...', value: null, color: 'gray' }}
        items={OPTIONS.map((option) => ({
          label: option,
          value: option,
        }))}
        style={{
          inputIOS: {
          },
          inputAndroid: {
          },
        }}
      />
    </View>
  );
};
