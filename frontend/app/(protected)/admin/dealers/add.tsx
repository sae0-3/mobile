import { useForm } from '@tanstack/react-form';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';
import { CustomButton } from '../../../../src/components/CustomButton';
import { FormPickerField } from '../../../../src/components/FormMultiSelectField';
import { FormTextField } from '../../../../src/components/FormTextField';
import { DealerRegisterSchema, defaultValues } from '../../../../src/dtos/dealerDto';
import { useCreateDealer } from '../../../../src/hooks/useDealers';

export default function AddDealerScreen() {
  const { mutate: create, isPending, isSuccess } = useCreateDealer();
  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      create(value);
    },
    validators: {
      onChange: DealerRegisterSchema,
    },
  });

  useEffect(() => {
    if (isSuccess) {
      router.back();
    }
  }, [isSuccess]);

  return (
    <View className="gap-4 w-10/12 mx-auto my-6">
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
          placeholder: "Repartidor",
        }}
      />

      <FormTextField
        form={form}
        name="email"
        labelProps={{
          title: 'Correo Electrónico',
          className: 'text-base font-semibold mb-1',
        }}
        required
        inputProps={{
          className: 'border border-gray-300 rounded-md px-3 py-2 bg-white',
          placeholder: "repartidor@example.com",
          autoCapitalize: 'none',
        }}
      />

      <FormTextField
        form={form}
        name="password"
        labelProps={{
          title: 'Contraseña',
          className: 'text-base font-semibold mb-1',
        }}
        required
        inputProps={{
          className: 'border border-gray-300 rounded-md px-3 py-2 bg-white',
          placeholder: "********",
        }}
      />

      <FormPickerField
        form={form}
        name="vehicle"
        labelProps={{
          title: 'Tipo de vehículo',
          className: 'text-base font-semibold mb-1',
        }}
        required
        options={[
          { label: 'Carro', value: 'car' },
          { label: 'Motocicleta', value: 'motorcycle' },
          { label: 'Bicicleta', value: 'bicycle' }
        ]}
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
  );
}
