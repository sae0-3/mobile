import { ScrollView, View } from 'react-native';
import { CustomButton } from '../../../../src/components/CustomButton';
import { FormSwitchField } from '../../../../src/components/FormSwitchField';
import { FormTextField } from '../../../../src/components/FormTextField';
import { CategoryUpdateSchema } from '../../../../src/dtos/categoryDto';
import { useForm } from '../../../../src/hooks/useForm';
import { useGetByIdCategory, useUpdateByIdCategory } from '../../../../src/hooks/useCategories';
import { makeZodValidator } from '../../../../src/utils/validator';
import { useLocalSearchParams, router } from 'expo-router';
import { useEffect } from 'react';


export default function EditCategoryScreen() {

  const { id } = useLocalSearchParams();
  const { data, isLoading, isError, error } = useGetByIdCategory(id.toString());
  const category = data?.data;
  const { mutate: update, isPending, isSuccess } = useUpdateByIdCategory(id.toString());

  const form = useForm({
    defaultValues: category,
    onSubmit: async (data: any) => {
      update(data);
    },
  });

  useEffect(() => {
    if (isSuccess) {
      router.navigate('/admin/categories');
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
          label="Nombre"
          validator={makeZodValidator(CategoryUpdateSchema, 'name')}
        />

        <FormTextField
          form={form}
          name="display_order"
          label="Orden de visualización"
          inputProps={{
            keyboardType: 'numeric',
          }}
          validator={makeZodValidator(CategoryUpdateSchema, 'display_order')}
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