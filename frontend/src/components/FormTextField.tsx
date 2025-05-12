import { Field } from '@tanstack/react-form';
import { Text, TextInput, type TextInputProps, View } from 'react-native';
import colors from '../theme/colors';
import { FieldValidationInfo } from './FieldValidationInfo';
import { Icon } from './Icon';

type FormTextFieldProps = {
  form: any;
  name: string;
  required?: boolean;
  className?: string;
  labelProps?: {
    title: string,
    className?: string,
  }
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
  labelProps,
  required = false,
  className,
  inputProps = {},
  secureTextEntry = false,
}: FormTextFieldProps) => {
  return (
    <Field
      form={form}
      name={name}
    >
      {(field) => (
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
