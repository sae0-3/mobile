import { Field } from '@tanstack/react-form';
import { Text, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { FieldValidationInfo } from './FieldValidationInfo';
import { Icon } from './Icon';

type FormPickerFieldProps = {
  form: any;
  name: string;
  required?: boolean;
  labelProps?: {
    title: string;
    className?: string;
  };
  options: { label: string; value: string }[];
};

export const FormPickerField = ({
  form,
  name,
  required,
  labelProps,
  options,
}: FormPickerFieldProps) => {
  return (
    <Field form={form} name={name}>
      {(field) => (
        <View className="flex-col">
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

          <RNPickerSelect
            value={field.state.value}
            onValueChange={(value) => field.handleChange(value)}
            items={options.map(option => ({
              label: option.label,
              value: option.value
            }))}
            placeholder={{ label: 'Selecciona una opción...', value: null, color: '#9ca3af' }}
            style={{
              inputAndroid: { color: 'black' },
              inputIOS: { color: 'black' },
              iconContainer: { top: 10, right: 12 },
            }}
          />

          <FieldValidationInfo field={field} />
        </View>
      )}
    </Field>
  );
};
