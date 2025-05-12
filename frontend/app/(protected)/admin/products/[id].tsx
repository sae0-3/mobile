import { useForm } from '@tanstack/react-form';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TextInput, View } from 'react-native';
import { CustomButton } from '../../../../src/components/CustomButton';
import { FormSwitchField } from '../../../../src/components/FormSwitchField';
import { FormTextField } from '../../../../src/components/FormTextField';
import { ProductUpdateSchema } from '../../../../src/dtos/productDto';
import { useGetByIdProduct, useUpdateByIdProduct } from '../../../../src/hooks/useProduct';

export default function EditProductScreen() {
  const { id } = useLocalSearchParams();
  const { data, isLoading, isError, error } = useGetByIdProduct(id.toString());
  const product = data?.data;
  const { mutate: update, isPending, isSuccess } = useUpdateByIdProduct(id.toString());
  const form = useForm({
    defaultValues: product,
    onSubmit: async ({ value }) => {
      const parsed = ProductUpdateSchema.parse(value);
      update(parsed);
    },
    validators: {
      onChange: ProductUpdateSchema, // TODO
    },
  });
  const [newIngredient, setNewIngredient] = useState('');
  const [ingredients, setIngredients] = useState<string[]>([]);

  useEffect(() => {
    if (product) {
      setIngredients(product.ingredients ?? []);
    }
  }, [product]);

  useEffect(() => {
    if (isSuccess) {
      router.back();
    }
  }, [isSuccess]);

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

  if (isLoading) {
    return <ActivityIndicator size="large" />;
  }

  if (isError) {
    return <Text>Error: {error?.message}</Text>;
  }

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
          name="price"
          labelProps={{
            title: 'Precio',
            className: 'text-base font-semibold mb-1',
          }}
          inputProps={{
            className: 'border border-gray-300 rounded-md px-3 py-2 bg-white',
            keyboardType: 'decimal-pad',
          }}
        />

        <FormTextField
          form={form}
          name="description"
          labelProps={{
            title: 'Descripción',
            className: 'text-base font-semibold mb-1',
          }}
          inputProps={{
            className: 'border border-gray-300 rounded-md px-3 py-2 bg-white',
            multiline: true,
          }}
        />

        <FormTextField
          form={form}
          name="img_reference"
          labelProps={{
            title: 'Imagen (URL)',
            className: 'text-base font-semibold mb-1',
          }}
          inputProps={{
            className: 'border border-gray-300 rounded-md px-3 py-2 bg-white',
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
          labelProps={{
            title: 'Orden de visualización',
            className: 'text-base font-semibold mb-1',
          }}
          inputProps={{
            className: 'border border-gray-300 rounded-md px-3 py-2 bg-white',
            keyboardType: 'number-pad',
          }}
        />

        <View className="flex flex-row justify-between">
          <FormSwitchField
            form={form}
            name="available"
            labelProps={{
              title: 'Disponible',
              className: 'text-base font-semibold mb-1',
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
