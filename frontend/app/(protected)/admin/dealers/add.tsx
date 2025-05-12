import { useForm } from '@tanstack/react-form';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';
import { CustomButton } from '../../../../src/components/CustomButton';
import { FormTextField } from '../../../../src/components/FormTextField';
import { DealerRegisterSchema } from '../../../../src/dtos/dealerDto';
import { useCreateDealer } from '../../../../src/hooks/useDealers';
import { RegisterDealerRequest } from '../../../../src/types/apiTypes';

export default function AddDealerScreen() {
  const { mutate: create, isPending, isSuccess } = useCreateDealer();
  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      create(value as RegisterDealerRequest);
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
        label="Nombre"
        required
        inputProps={{
          placeholder: "Repartidor",
        }}
      />

      <FormTextField
        form={form}
        name="email"
        label="Correo Electrónico"
        required
        inputProps={{
          placeholder: "repartidor@example.com",
        }}
      />

      <FormTextField
        form={form}
        name="password"
        label="Contraseña"
        required
        inputProps={{
          placeholder: "********",
        }}
      />

      <FormTextField
        form={form}
        name="vehicle"
        label="Tipo de vehículo"
        required
        inputProps={{
          placeholder: "motorcycle | bicycle | car",
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
  );
}

const defaultValues = {
  name: '',
  email: '',
  password: '',
  vehicle: '',
};
