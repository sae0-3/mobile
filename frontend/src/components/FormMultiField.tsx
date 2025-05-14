import { ScrollView, Text, View } from 'react-native';
import { CustomButton } from './CustomButton';
import { Icon } from './Icon';

type Item = {
  id: string,
  label: string,
  value: string,
};

type FormMultiFieldProps = {
  onAdd: () => void,
  onDelete: (id: string) => void;
  required?: boolean;
  items: Item[];
  labelProps?: {
    title: string;
    className?: string;
  };
  className?: string;
  renderInput: () => React.ReactNode;
};

export const FormMultiField = ({
  items,
  required = false,
  onAdd,
  onDelete,
  labelProps,
  className,
  renderInput,
}: FormMultiFieldProps) => {
  return (
    <View className={className}>
      {!!labelProps && (
        <Text className={labelProps.className}>
          {labelProps.title}: {required && (
            <Icon
              name="asterisk"
              color="red"
              size={12}
              type="MaterialCommunityIcons"
            />
          )}
        </Text>
      )}

      <View className="flex-row items-center gap-2">
        {renderInput()}

        <CustomButton
          title="Añadir"
          onPress={onAdd}
          iconRight={{
            name: 'plus',
          }}
          className="p-1"
        />
      </View>

      <ScrollView
        className={`max-h-48 gap-2 ${items.length > 0 ? 'mt-4' : ''}`}
        nestedScrollEnabled
      >
        {items.map((item, idx) => (
          <View
            key={item.id}
            className="flex-row items-center justify-between border-t border-t-gray-300 py-2"
          >
            <Text className="flex-1">
              {idx + 1}. {item.label}
            </Text>

            <CustomButton
              className="bg-transparent"
              iconRight={{
                name: 'trash-2',
                color: 'red',
              }}
              onPress={() => onDelete(item.id)}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
