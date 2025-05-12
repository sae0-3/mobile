import { useForm } from '@tanstack/react-form';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { CustomButton } from '../../../../src/components/CustomButton';
import { FormSwitchField } from '../../../../src/components/FormSwitchField';
import { FormTextField } from '../../../../src/components/FormTextField';
import { CategoryUpdateSchema } from '../../../../src/dtos/categoryDto';
import { useGetByIdCategory, useUpdateByIdCategory } from '../../../../src/hooks/useCategories';

export default function EditCategoryScreen() {
  const { id } = useLocalSearchParams();
  const { data, isLoading, isError, error } = useGetByIdCategory(id.toString());
  const category = data?.data;
  const { mutate: update, isPending, isSuccess } = useUpdateByIdCategory(id.toString());
  const form = useForm({
    defaultValues: category,
    onSubmit: async ({ value }) => {
      const parsed = CategoryUpdateSchema.parse(value);
      update(parsed);
    },
    validators: {
      onChange: CategoryUpdateSchema, // TODO
    },
  });

  useEffect(() => {
    if (isSuccess) {
      router.back();
    }
  }, [isSuccess]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
    >
      <View className="w-10/12 mx-auto my-6 gap-4">
        <FormTextField
          form={form}
          name="name"
          labelProps={{
            title: 'Nombre',
            className: 'text-base font-semibold mb-1',
          }}
          inputProps={{
            className: 'border border-gray-300 rounded-md px-3 py-2 bg-white',
          }}
        />

        <FormTextField
          form={form}
          name="display_order"
          labelProps={{
            title: 'Orden de visualización',
            className: 'text-base font-semibold mb-1',
          }}
          inputProps={{
            className: 'border border-gray-300 rounded-md px-3 py-2 bg-white',
            keyboardType: 'number-pad',
          }}
        />

        <FormSwitchField
          form={form}
          name="visible"
          labelProps={{
            title: 'Visible',
            className: 'text-base font-semibold mb-1',
          }}
        />

        <View className="flex flex-row justify-between">
          <CustomButton
            title="Cancelar"
            onPress={router.back}
            iconRight={{
              name: 'x-square',
            }}
            className="w-2/5 p-2"
            disabled={isPending}
          />
          <CustomButton
            title="Guardar"
            onPress={form.handleSubmit}
            iconRight={{
              name: 'save',
            }}
            className="w-2/5 p-2"
            disabled={isPending}
          />
        </View>
      </View>
    </ScrollView>
  );
}
