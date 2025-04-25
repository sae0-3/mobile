import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { CustomButton } from '../../../../src/components/CustomButton';
import { FormSwitchField } from '../../../../src/components/FormSwitchField';
import { FormTextField } from '../../../../src/components/FormTextField';
import { ProductInsertSchema } from '../../../../src/dtos/productDto';
import { useForm } from '../../../../src/hooks/useForm';
import { useCreateProduct } from '../../../../src/hooks/useProduct';
import { makeZodValidator } from '../../../../src/utils/validator';

export default function AddProductScreen() {
  const { mutate: create, isPending, isSuccess } = useCreateProduct();
  const form = useForm({
    defaultValues,
    onSubmit: (data: any) => {
      create(data);
    }
  });
  const [newIngredient, setNewIngredient] = useState('');
  const [ingredients, setIngredients] = useState(form.getFieldValue('ingredients') as string[]);

  useEffect(() => {
    if (isSuccess) {
      router.navigate('/admin/products');
    }
  }, [isSuccess])

  const addIngredient = () => {
    const trimmed = newIngredient.trim();
    if (trimmed) {
      const updated = [...ingredients, trimmed];
      setIngredients(updated);
      form.setFieldValue('ingredients', updated);
      setNewIngredient('');
    }
  };

  const removeIngredient = (index: number) => {
    const updated = ingredients.filter((_, i) => i !== index);
    setIngredients(updated);
    form.setFieldValue('ingredients', updated);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
    >
      <View className="gap-4 w-10/12 mx-auto my-6">
        <FormTextField
          form={form}
          name="name"
          label="Nombre"
          required
          inputProps={{
            placeholder: "Producto",
          }}
          validator={makeZodValidator(ProductInsertSchema, 'name')}
        />

        <FormTextField
          form={form}
          name="price"
          label="Precio"
          required
          inputProps={{
            placeholder: '0',
            keyboardType: 'numeric',
          }}
          parseValue={(val) => {
            const num = parseFloat(val);
            if (isNaN(num)) return undefined;
            return Number(num.toFixed(2));
          }}
          validator={makeZodValidator(ProductInsertSchema, 'price')}
        />

        <FormTextField
          form={form}
          name="description"
          label="Descripción"
          inputProps={{
            placeholder: "Descripción del producto...",
            multiline: true,
          }}
          validator={makeZodValidator(ProductInsertSchema, 'description')}
        />

        <FormTextField
          form={form}
          name="img_reference"
          label="Imagen (URL)"
          inputProps={{
            placeholder: 'https://example.com',
          }}
          validator={makeZodValidator(ProductInsertSchema, 'img_reference')}
        />

        <View>
          <Text className="text-base font-semibold mb-1">Ingredientes:</Text>

          <View className="flex-row items-center gap-2">
            <TextInput
              className="border border-gray-300 rounded-md px-3 py-2 bg-white flex-1"
              placeholder="Nuevo ingrediente"
              value={newIngredient}
              onChangeText={setNewIngredient}
            />
            <CustomButton
              title="Añadir"
              onPress={addIngredient}
              iconRight={{
                name: 'plus',
              }}
              className="p-1"
            />
          </View>

          <ScrollView
            className={`max-h-48 gap-2 ${ingredients.length > 0 ? 'mt-4' : ''}`}
            nestedScrollEnabled
          >
            {ingredients.map((ingredient, idx) => (
              <View
                key={`${ingredient}-${idx}`}
                className="flex-row items-center justify-between border-t border-t-gray-300 py-2"
              >
                <Text className="flex-1">{idx + 1}. {ingredient}</Text>
                <CustomButton
                  className="bg-transparent"
                  iconRight={{
                    name: 'trash-2',
                    color: 'red',
                  }}
                  onPress={() => removeIngredient(idx)}
                />
              </View>
            ))}
          </ScrollView>
        </View>

        <FormTextField
          form={form}
          name="display_order"
          label="Orden de visualización"
          inputProps={{
            placeholder: '0',
            keyboardType: 'numeric',
          }}
          validator={makeZodValidator(ProductInsertSchema, 'display_order')}
          parseValue={(val) => {
            const num = parseInt(val, 10);
            if (isNaN(num)) return undefined;
            return num
          }}
        />

        <View className="flex flex-row justify-between">
          <FormSwitchField
            form={form}
            name="available"
            label="Disponible"
          />

          <FormSwitchField
            form={form}
            name="visible"
            label="Visible"
          />
        </View>

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

const defaultValues = {
  name: '',
  price: 0,
  description: null,
  img_reference: null,
  ingredients: [],
  available: true,
  visible: true,
  display_order: 0,
};
