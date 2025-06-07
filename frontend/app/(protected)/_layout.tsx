import { Redirect, Stack } from 'expo-router';
import { Loading } from '../../src/components/Loading';
import { useAuth } from '../../src/stores/auth';

export default function ProtectedLayout() {
  const { isAuthenticated, rehydrated } = useAuth();

  if (!rehydrated) return <Loading />;

  if (!isAuthenticated) return <Redirect href="/login" />;

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
