import { View, ScrollView } from 'react-native';
import { FormTextField } from '../../../../src/components/FormTextField';
import { FormSwitchField } from '../../../../src/components/FormSwitchField';
import { CustomButton } from '../../../../src/components/CustomButton';
import { useForm } from '../../../../src/hooks/useForm';
import { useCreateCategory } from '../../../../src/hooks/useCategories';
import { CategoryInsertSchema } from '../../../../src/dtos/categoryDto';
import { makeZodValidator } from '../../../../src/utils/validator';
import { useEffect } from 'react';
import { router } from 'expo-router';
import { SquareX, Save } from 'lucide-react-native';


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
      router.navigate('/admin/categories');
    }
  }, [isSuccess])

  return (
    <ScrollView
      className="w-10/12 mx-auto my-6"
      showsVerticalScrollIndicator={false}
    >
      <View className="flex gap-4">
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
            icon={{ Icon: SquareX }}
            className="w-2/5"
            disabled={isPending}
          />
          <CustomButton
            title="Guardar"
            onPress={form.handleSubmit}
            icon={{ Icon: Save }}
            className="w-2/5"
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
}