import { useForm } from '@tanstack/react-form';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { CustomButton } from '../../../../src/components/CustomButton';
import { FormSwitchField } from '../../../../src/components/FormSwitchField';
import { FormTextField } from '../../../../src/components/FormTextField';
import { CategoryInsertSchema, defaultValues } from '../../../../src/dtos/categoryDto';
import { useCreateCategory } from '../../../../src/hooks/useCategories';

export default function AddCategoryScreen() {
  const { mutate: create, isPending, isSuccess } = useCreateCategory();
  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      const parsed = CategoryInsertSchema.parse(value);
      create(parsed);
    },
    validators: {
      onChange: CategoryInsertSchema, // TODO
    },
  });

  useEffect(() => {
    if (isSuccess) {
      router.back();
    }
  }, [isSuccess])

  return (
    <ScrollView
      className="w-10/12 mx-auto my-6"
      showsVerticalScrollIndicator={false}
    >
      <View className="gap-4">
        <FormTextField
          form={form}
          name="name"
          labelProps={{
            title: 'Nombre',
            className: 'text-base font-semibold mb-1',
          }}
          required
          inputProps={{
            className: 'border border-gray-300 rounded-md px-3 py-2 bg-white',
            placeholder: "Categoría",
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
            placeholder: '0',
            keyboardType: 'numeric',
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
              name: "save",
            }}
            className="w-2/5 p-2"
            disabled={isPending}
          />
        </View>
      </View>
    </ScrollView>
  );
}
