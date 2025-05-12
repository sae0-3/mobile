import type { AnyFieldApi } from '@tanstack/react-form';
import { Text } from 'react-native';

export const FieldValidationInfo = ({ field }: { field: AnyFieldApi }) => {
  return (
    <>
      {field.state.meta.isTouched && !!field.state.meta.errors.length ? (
        <Text className="text-red-500 text-sm">
          {field.state.meta.errors.map((err) => err.message).join('\n')}
        </Text>
      ) : null}

      {field.state.meta.isValidating && !!field.state.meta.errorSourceMap.onSubmit ? (
        <Text className="">
          Validando...
        </Text>
      ) : null}
    </>
  );
};
