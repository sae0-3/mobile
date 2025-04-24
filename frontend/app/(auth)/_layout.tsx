import { Stack } from 'expo-router';
import DecoratedLayout from '../../src/layouts/AuthLayout';

export default function AuthLayout() {
  return (
    <DecoratedLayout>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: 'transparent',
          },
          animation: 'fade',
        }}
      />
    </DecoratedLayout>
  );
}
