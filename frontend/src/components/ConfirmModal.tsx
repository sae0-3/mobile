import { Modal, Text, View, Pressable } from 'react-native';

interface ConfirmModalProps {
  visible: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  visible,
  title,
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onCancel}
    >
      <View className="flex-1 bg-black/50 justify-center items-center">
        <View className="w-4/5 bg-white rounded-2xl p-6 shadow-lg">
          <Text className="text-lg font-semibold text-center mb-2">{title}</Text>
          <Text className="text-base text-gray-600 text-center mb-6">{message}</Text>

          <View className="flex-row justify-between">
            <Pressable
              className="flex-1 mr-2 bg-red-400 py-3 rounded-xl items-center"
              onPress={onCancel}
            >
              <Text className="text-white font-medium">Cancelar</Text>
            </Pressable>

            <Pressable
              className="flex-1 ml-2 bg-primary py-3 rounded-xl items-center"
              onPress={onConfirm}
            >
              <Text className="text-white font-medium">Confirmar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};
