import { Field } from '@tanstack/react-form';
import { Text, TextInput, type TextInputProps, View } from 'react-native';
import colors from '../theme/colors';
import { FieldValidationInfo } from './FieldValidationInfo';
import { Icon } from './Icon';

type FormTextFieldProps = {
  form: any;
  name: string;
  label?: string;
  required?: boolean;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  inputProps?: Omit<TextInputProps,
    'value' |
    'onChangeText' |
    'secureTextEntry'
  >;
  secureTextEntry?: boolean
};

export const FormTextField = ({
  form,
  name,
  label,
  required = false,
  containerClassName,
  inputProps = {},
  labelClassName = 'text-base font-semibold mb-1',
  inputClassName = 'border border-gray-300 rounded-md px-3 py-2 bg-white',
  secureTextEntry = false,
}: FormTextFieldProps) => {
  return (
    <Field
      form={form}
      name={name}
    >
      {(field) => (
        <View className={containerClassName}>
          {label && (
            <Text className={labelClassName}>
              {label}: {required && <Icon name="asterisk" color="red" size={12} type="MaterialCommunityIcons" />}
            </Text>
          )}

          <TextInput
            {...inputProps}
            placeholder={inputProps.placeholder}
            value={field.state.value?.toString() ?? ''}
            multiline={inputProps.multiline}
            numberOfLines={inputProps.multiline ? 5 : 1}
            onChangeText={field.handleChange}
            className={inputProps.className}
            selectionColor={inputProps.selectionColor || colors.primary}
            secureTextEntry={secureTextEntry}
            textContentType={inputProps.textContentType}
            importantForAutofill={inputProps.importantForAutofill}
          />

          <FieldValidationInfo field={field} />
        </View>
      )}
    </Field>
  );
};
