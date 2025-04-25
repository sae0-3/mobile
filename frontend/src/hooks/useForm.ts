import { useForm as tanstackUseForm } from '@tanstack/react-form';

export const useForm = ({
  defaultValues,
  onSubmit,
}: {
  defaultValues: unknown;
  onSubmit: (values: unknown) => void | Promise<void>;
}) =>
  tanstackUseForm({
    defaultValues,
    onSubmit: ({ value }) => onSubmit(value),
  });
