import React, { useEffect } from 'react';
import { Modal, Text, View, Pressable, ActivityIndicator } from 'react-native';
import { Icon } from './Icon';
import { FormTextField } from './FormTextField';
import { useUpdateByIdClient } from '../hooks/useClients';
import { useForm } from '@tanstack/react-form';
import { ClientUpdateProfileSchema } from '../dtos/clientDto';

type EditProfileModalProps = {
  onClose: () => void;
  id: string;
  name: string;
  email: string;
  phone: string | undefined | null;
};

export const EditProfileModal = ({
  onClose,
  id,
  name,
  email,
  phone,
}: EditProfileModalProps) => {
  const { mutate: update, isPending, error, isSuccess } = useUpdateByIdClient(String(id));

  const form = useForm({
    defaultValues: { name, email, phone: phone ?? '' },
    onSubmit: ({ value }) => {
      update(value);
    },
    validators: {
      onChange:
        ClientUpdateProfileSchema,
    },
  });
  useEffect(() => {
    if (isSuccess) {
      onClose();
    }
  }, [isSuccess]);

  return (
    <Modal animationType="fade" transparent>
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="w-4/5 bg-white rounded-2xl p-6 shadow-lg space-y-4 relative">

          <Text className="text-lg font-semibold text-center">Editar Perfil</Text>

          <View className="flex-row items-center border-b border-gray-300 px-2 py-1">
            <Icon name="user" color="black" />
            <FormTextField
              form={form}
              name="name"
              className="flex-1 ml-2 py-1"
              inputProps={{
                placeholder: 'Nombre *',
                textContentType: 'name',
              }}
              required
            />
          </View>

          <View className="flex-row items-center border-b border-gray-300 px-2 py-1">
            <Icon name="mail" color="black" />
            <FormTextField
              form={form}
              name="email"
              className="flex-1 ml-2 py-1"
              inputProps={{
                placeholder: 'Correo *',
                keyboardType: 'email-address',
                textContentType: 'emailAddress',
                autoCapitalize: 'none',
              }}
              required
            />
          </View>

          <View className="flex-row items-center border-b border-gray-300 px-2 py-1">
            <Icon name="phone" color="black" />
            <FormTextField
              form={form}
              name="phone"
              className="flex-1 ml-2 py-1"
              inputProps={{
                placeholder: 'Teléfono',
                keyboardType: 'phone-pad',
                textContentType: 'telephoneNumber',
              }}
            />
          </View>

          <View className="flex-row justify-between mt-6">
            <Pressable
              className="flex-1 mr-2 bg-red-400 py-3 rounded-xl items-center"
              onPress={onClose}
              disabled={isPending}
              style={{ opacity: isPending ? 0.6 : 1 }}
            >
              <Text className="text-white font-medium">Cancelar</Text>
            </Pressable>

            <Pressable
              className="flex-1 ml-2 bg-primary py-3 rounded-xl items-center flex-row justify-center"
              onPress={() => form.handleSubmit()}
              disabled={!form.state.isValid || isPending}
              style={{ opacity: (!form.state.isValid || isPending) ? 0.6 : 1 }}
            >
              {isPending
                ? <ActivityIndicator color="#fff" />
                : <Text className="text-white font-medium">Guardar</Text>
              }
            </Pressable>
          </View>

          {error && (
            <Text className="text-red-500 text-center">
              {error.response?.data?.message || 'Error al actualizar perfil'}
            </Text>
          )}

        </View>
      </View>
    </Modal>
  );
};