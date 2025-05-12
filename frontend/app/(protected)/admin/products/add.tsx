import { useForm } from '@tanstack/react-form';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { CustomButton } from '../../../../src/components/CustomButton';
import { FormSwitchField } from '../../../../src/components/FormSwitchField';
import { FormTextField } from '../../../../src/components/FormTextField';
import { ProductInsertSchema, defaultValues } from '../../../../src/dtos/productDto';
import { useCreateProduct } from '../../../../src/hooks/useProduct';

export default function AddProductScreen() {
  const { mutate: create, isPending, isSuccess } = useCreateProduct();
  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      const parsed = ProductInsertSchema.parse(value);
      create(parsed);
    },
    validators: {
      onChange: ProductInsertSchema, // TODO
    }
  });
  const [newIngredient, setNewIngredient] = useState('');
  const [ingredients, setIngredients] = useState<string[]>([]);

  useEffect(() => {
    if (isSuccess) {
      router.back();
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
        />

        <FormTextField
          form={form}
          name="price"
          label="Precio"
          required
          inputProps={{
            placeholder: '0',
            keyboardType: 'decimal-pad',
          }}
        />

        <FormTextField
          form={form}
          name="description"
          label="Descripción"
          inputProps={{
            placeholder: "Descripción del producto...",
            multiline: true,
          }}
        />

        <FormTextField
          form={form}
          name="img_reference"
          label="Imagen (URL)"
          inputProps={{
            placeholder: 'https://example.com',
            keyboardType: 'url',
          }}
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
            keyboardType: 'number-pad',
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
