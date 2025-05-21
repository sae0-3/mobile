import { useForm } from '@tanstack/react-form';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TextInput, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { CustomButton } from '../../../../src/components/CustomButton';
import { FormMultiField } from '../../../../src/components/FormMultiField';
import { FormSwitchField } from '../../../../src/components/FormSwitchField';
import { FormTextField } from '../../../../src/components/FormTextField';
import { ProductUpdateSchema } from '../../../../src/dtos/productDto';
import {
  useGetByIdProduct,
  useGetCategoriesLinkedByIdProduct,
  useGetCategoriesUnlinkedByIdProduct,
  useLinkProductToCategory,
  useUnlinkProductToCategory,
  useUpdateByIdProduct,
} from '../../../../src/hooks/useProduct';

export default function EditProductScreen() {
  const { id } = useLocalSearchParams();
  const [newIngredient, setNewIngredient] = useState('');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  const { data, isLoading, isError, error } = useGetByIdProduct(id.toString());
  const { data: linkedCategoriesData } = useGetCategoriesLinkedByIdProduct(id.toString());
  const { data: unlinkedCategoriesData } = useGetCategoriesUnlinkedByIdProduct(id.toString());
  const { mutate: linkCategory } = useLinkProductToCategory(id.toString());
  const { mutate: unlinkCategory } = useUnlinkProductToCategory(id.toString());
  const { mutate: update, isPending, isSuccess } = useUpdateByIdProduct(id.toString());

  const product = data?.data;

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

        <FormMultiField
          labelProps={{
            title: 'Ingredientes',
            className: 'text-base font-semibold mb-1',
          }}
          items={ingredients.map((ingredient, idx) => ({
            id: idx.toString(),
            value: ingredient,
            label: ingredient,
          }))}
          onDelete={(id) => removeIngredient(parseInt(id, 10))}
          onAdd={addIngredient}
          renderInput={() => (
            <TextInput
              className="border border-gray-300 rounded-md px-3 py-2 bg-white flex-1"
              placeholder="Nuevo ingrediente"
              value={newIngredient}
              onChangeText={setNewIngredient}
            />
          )}
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

        <FormMultiField
          labelProps={{
            title: 'Categorías',
            className: 'text-base font-semibold',
          }}
          items={linkedCategoriesData?.data.map(category => ({
            id: category.id,
            value: category.id,
            label: category.name,
          })) || []}
          onDelete={unlinkCategory}
          onAdd={() => {
            if (selectedCategoryId) {
              linkCategory(selectedCategoryId);
              setSelectedCategoryId(null);
            }
          }}
          renderInput={() => (
            <View className='flex-1'>
              <RNPickerSelect
                value={selectedCategoryId}
                onValueChange={(value) => setSelectedCategoryId(value)}
                items={unlinkedCategoriesData?.data.map(category => ({
                  label: category.name,
                  value: category.id,
                })) || []}
                placeholder={{ label: 'Selecciona una opción...', value: null, color: '#9ca3af' }}
                style={{
                  inputAndroid: { color: 'black' },
                  inputIOS: { color: 'black' },
                }}
              />
            </View>
          )}
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
