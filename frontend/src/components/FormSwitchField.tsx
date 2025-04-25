import { Field } from '@tanstack/react-form';
import { Switch, Text, View } from 'react-native';

export const FormSwitchField = ({
  form,
  name,
  label,
  classname,
}: {
  form: any,
  name: string,
  label: string,
  required?: boolean
  classname?: string,
}) => {
  return (
    <Field
      form={form}
      name={name}
      children={(field) => (
        <View className={`flex-row items-center ${classname}`}>
          <Text className="text-base font-semibold mb-1">{label}</Text>
          <Switch
            value={!!field.state.value}
            onValueChange={(value) => field.handleChange(value)}
          />
        </View>
      )}
    />
  );
}
