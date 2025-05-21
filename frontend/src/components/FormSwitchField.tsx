import { Field } from '@tanstack/react-form';
import { Switch, Text, View } from 'react-native';
import { Icon } from './Icon';

type FormSwitchFieldProps = {
  form: any;
  name: string;
  required?: boolean;
  className?: string;
  labelProps?: {
    title: string,
    className?: string,
  }
};

export const FormSwitchField = ({
  form,
  name,
  required,
  labelProps,
  className,
}: FormSwitchFieldProps) => {
  return (
    <Field
      form={form}
      name={name}
      children={(field) => (
        <View className={`flex-row items-center ${className}`}>
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

          <Switch
            value={!!field.state.value}
            onValueChange={(value) => field.handleChange(value)}
          />
        </View>
      )}
    />
  );
}
