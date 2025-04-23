import { QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { queryClient } from '../src/lib/queryClient';
import '../global.css';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar translucent={true} />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </QueryClientProvider>
  );
}
