import { Field } from '@tanstack/react-form';
import { Asterisk } from 'lucide-react-native';
import { Text, TextInput, type TextInputProps, View } from 'react-native';

type FormTextFieldProps = {
  form: any;
  name: string;
  label: string;
  required?: boolean;
  validator?: (value: any) => string | undefined;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
  inputProps?: Omit<TextInputProps,
    'value' |
    'onChangeText' |
    'className'
  >;
  parseValue?: (text: string) => any;
};

export const FormTextField = ({
  form,
  name,
  label,
  required = false,
  validator,
  containerClassName,
  inputProps = {},
  parseValue,
  labelClassName = 'text-base font-semibold mb-1',
  inputClassName = 'border border-gray-300 rounded-md px-3 py-2 bg-white',
  errorClassName = 'text-red-600 mt-1',
}: FormTextFieldProps) => {
  return (
    <Field
      form={form}
      name={name}
      validators={validator ? { onChange: ({ value }) => validator(value) } : undefined}
    >
      {(field) => (
        <View className={containerClassName}>
          <Text className={labelClassName}>
            {label}: {required && <Asterisk color="red" size={12} />}
          </Text>

          <TextInput
            {...inputProps}
            placeholder={inputProps.placeholder}
            value={field.state.value?.toString() ?? ''}
            autoCapitalize="none"
            multiline={inputProps.multiline}
            numberOfLines={inputProps.multiline ? 5 : 1}
            onChangeText={(text) => {
              if (parseValue) {
                field.handleChange(parseValue(text));
              } else {
                field.handleChange(text);
              }
            }}
            className={inputClassName}
          />

          {field.state.meta.errors?.length > 0 && (
            <Text className={errorClassName}>
              {field.state.meta.errors[0]}
            </Text>
          )}
        </View>
      )}
    </Field>
  );
};
