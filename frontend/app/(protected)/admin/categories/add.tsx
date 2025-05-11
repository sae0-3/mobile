import { router } from 'expo-router';
import { useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { CustomButton } from '../../../../src/components/CustomButton';
import { FormSwitchField } from '../../../../src/components/FormSwitchField';
import { FormTextField } from '../../../../src/components/FormTextField';
import { CategoryInsertSchema } from '../../../../src/dtos/categoryDto';
import { useCreateCategory } from '../../../../src/hooks/useCategories';
import { useForm } from '../../../../src/hooks/useForm';
import { makeZodValidator } from '../../../../src/utils/validator';

export default function AddCategoryScreen() {
  const { mutate: create, isPending, isSuccess } = useCreateCategory();
  const form = useForm({
    defaultValues,
    onSubmit: (data: any) => {
      create(data);
    }
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
          label="Nombre"
          required
          inputProps={{
            placeholder: "Categoría",
          }}
          validator={makeZodValidator(CategoryInsertSchema, 'name')}
        />

        <FormTextField
          form={form}
          name="display_order"
          label="Orden de visualización"
          inputProps={{
            placeholder: '0',
            keyboardType: 'numeric',
          }}
          validator={makeZodValidator(CategoryInsertSchema, 'display_order')}
          parseValue={(val) => {
            const num = parseInt(val, 10);
            if (isNaN(num)) return undefined;
            return num
          }}
        />

        <FormSwitchField
          form={form}
          name="visible"
          label="Visible"
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

const defaultValues = {
  name: '',
  display_order: 0,
  visible: true,
};
